'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

// Rate limiting
let ultimoEnvio = 0
const TEMPO_MINIMO_ENTRE_ENVIOS = 3000
let tentativasEnvio = 0
const MAX_TENTATIVAS = 5

interface DateValidation {
  valido: boolean
  erro?: string
  data?: Date
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    cep: '',
    telefone: '',
    data_nascimento: '',
    honeypot: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Validação de email
  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validação de data
  const validarData = (dataString: string): DateValidation => {
    dataString = dataString.trim()

    if (!dataString) {
      return { valido: false, erro: 'Data vazia' }
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
      return { valido: false, erro: 'Formato inválido. Use dd/mm/aaaa' }
    }

    const [dia, mes, ano] = dataString.split('/').map(Number)

    if (!dia || !mes || !ano) {
      return { valido: false, erro: 'Data com valores inválidos' }
    }

    if (mes < 1 || mes > 12) {
      return { valido: false, erro: 'Mês inválido (1-12)' }
    }

    const anoAtual = new Date().getFullYear()
    if (ano < 1900 || ano > anoAtual) {
      return { valido: false, erro: `Ano deve estar entre 1900 e ${anoAtual}` }
    }

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const bissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)
    if (bissexto) {
      diasPorMes[1] = 29
    }

    const maxDias = diasPorMes[mes - 1]
    if (dia < 1 || dia > maxDias) {
      return { valido: false, erro: `Dia inválido para ${mes}/${ano} (máx: ${maxDias})` }
    }

    const dataInformada = new Date(ano, mes - 1, dia)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    if (dataInformada > hoje) {
      return { valido: false, erro: 'Data não pode ser no futuro' }
    }

    const idadeMinima = 13
    const anoMinimo = anoAtual - idadeMinima
    const dataMinimaPermitida = new Date(anoMinimo, hoje.getMonth(), hoje.getDate())

    if (dataInformada > dataMinimaPermitida) {
      return { valido: false, erro: `É necessário ter pelo menos ${idadeMinima} anos` }
    }

    const anoMaximo = anoAtual - 150
    if (ano < anoMaximo) {
      return { valido: false, erro: 'Data muito antiga' }
    }

    return { valido: true, data: dataInformada }
  }

  // Máscaras
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'cep') {
      maskedValue = value.replace(/\D/g, '')
      if (maskedValue.length > 5) {
        maskedValue = maskedValue.slice(0, 5) + '-' + maskedValue.slice(5, 8)
      }
    } else if (name === 'telefone') {
      maskedValue = value.replace(/\D/g, '')
      if (maskedValue.length <= 10) {
        maskedValue = maskedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
      } else {
        maskedValue = maskedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
      }
    } else if (name === 'data_nascimento') {
      maskedValue = value.replace(/\D/g, '')
      if (maskedValue.length > 2) {
        maskedValue = maskedValue.slice(0, 2) + '/' + maskedValue.slice(2)
      }
      if (maskedValue.length > 5) {
        maskedValue = maskedValue.slice(0, 5) + '/' + maskedValue.slice(5, 9)
      }
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue }))
  }

  // Validação do formulário
  const validateForm = (): boolean => {
    if (!formData.nome_completo || formData.nome_completo.trim().length < 3) {
      alert('Por favor, digite seu nome completo.')
      return false
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      alert('Por favor, digite um e-mail válido.')
      return false
    }

    if (formData.cep) {
      const cepValue = formData.cep.replace(/\D/g, '')
      if (cepValue.length > 0 && cepValue.length !== 8) {
        alert('CEP incompleto. Complete ou deixe em branco.')
        return false
      }
    }

    if (formData.telefone) {
      const phoneValue = formData.telefone.replace(/\D/g, '')
      if (phoneValue.length > 0 && phoneValue.length < 10) {
        alert('Telefone incompleto. Complete ou deixe em branco.')
        return false
      }
    }

    if (formData.data_nascimento) {
      const validacao = validarData(formData.data_nascimento)
      if (!validacao.valido) {
        alert('Data de nascimento inválida: ' + validacao.erro)
        return false
      }
    }

    return true
  }

  // Envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Rate limiting
    const agora = Date.now()
    if (agora - ultimoEnvio < TEMPO_MINIMO_ENTRE_ENVIOS) {
      alert('Por favor, aguarde alguns segundos antes de enviar novamente.')
      return
    }

    if (tentativasEnvio >= MAX_TENTATIVAS) {
      alert('Muitas tentativas. Por favor, recarregue a página e tente novamente.')
      return
    }

    tentativasEnvio++

    // Verificar honeypot (anti-bot)
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.log('Bot detectado')
      alert('Erro ao processar cadastro.')
      return
    }

    setIsSubmitting(true)

    try {
      // Converter data se preenchida
      let dataFormatada = null
      if (formData.data_nascimento) {
        const [dia, mes, ano] = formData.data_nascimento.split('/')
        if (dia && mes && ano && ano.length === 4) {
          dataFormatada = `${ano}-${mes}-${dia}`
        }
      }

      const dadosCadastro = {
        nome_completo: formData.nome_completo.trim(),
        email: formData.email.trim(),
        cep: formData.cep ? formData.cep.trim() : null,
        telefone: formData.telefone ? formData.telefone.trim() : null,
        data_nascimento: dataFormatada
      }

      console.log('Enviando cadastro:', dadosCadastro)

      const { data, error } = await supabase
        .from('cadastros_comunidade')
        .insert([dadosCadastro])
        .select()

      if (error) {
        console.error('Erro Supabase:', error)

        if (error.code === '23505') {
          alert('Este e-mail já está cadastrado!')
        } else {
          alert('Erro ao salvar cadastro: ' + error.message)
        }

        setIsSubmitting(false)
        return
      }

      console.log('Cadastro salvo com sucesso!', data)

      // Marcar tempo do último envio
      ultimoEnvio = Date.now()
      tentativasEnvio = 0

      // Mostrar card de sucesso
      setShowSuccess(true)

    } catch (error) {
      console.error('Erro geral:', error)
      alert('Erro ao processar cadastro. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="promo-card show">
        <div className="promo-icon">
          <Image
            src="/icone_cadastro_sucesso.png"
            alt="Sucesso"
            width={80}
            height={80}
          />
        </div>
        <h3 className="promo-title">Prontinho!</h3>
        <p className="promo-text">
          Seu cadastro foi recebido com sucesso.<br/>
          Em breve, você receberá conteúdos exclusivos, convites especiais e atualizações sobre tudo o que estamos preparando para transformar o futuro do roteiro audiovisual no Brasil.
        </p>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Nome completo</h2>
      <input
        type="text"
        name="nome_completo"
        placeholder="Digite seu nome completo"
        className="form-input"
        value={formData.nome_completo}
        onChange={handleInputChange}
      />
      <p className="form-hint">Só você veremos seu nome completo na nossa lista e-mails</p>

      <h2 className="form-title">E-mail</h2>
      <input
        type="email"
        name="email"
        placeholder="Digite seu e-mail"
        className="form-input"
        value={formData.email}
        onChange={handleInputChange}
      />
      <p className="form-hint">Usaremos e notificarmos se sua conta estiver ativa</p>

      <h2 className="form-title">CEP</h2>
      <input
        type="text"
        name="cep"
        placeholder="00000-000"
        className="form-input"
        value={formData.cep}
        onChange={handleInputChange}
      />
      <p className="form-hint">Apenas para fins estatísticos, não vamos usar isto de nenhuma outra maneira</p>

      <h2 className="form-title">Telefone</h2>
      <input
        type="tel"
        name="telefone"
        placeholder="(00)00000-0000"
        className="form-input"
        value={formData.telefone}
        onChange={handleInputChange}
      />
      <p className="form-hint">Apenas para notificarmos o lançamento e oferecer suporte em caso</p>

      <h2 className="form-title">Data de nascimento</h2>
      <input
        type="text"
        name="data_nascimento"
        placeholder="dd/mm/aaaa"
        className="form-input"
        value={formData.data_nascimento}
        onChange={handleInputChange}
      />
      <p className="form-hint">Apenas para saber a faixa de nascimento</p>

      {/* Campo honeypot (armadilha para bots) - invisível para humanos */}
      <input
        type="text"
        name="honeypot"
        id="website"
        style={{display: 'none', position: 'absolute', left: '-9999px'}}
        tabIndex={-1}
        autoComplete="off"
        value={formData.honeypot}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Entrar na comunidade (Beta)'}
      </button>
    </form>
  )
}

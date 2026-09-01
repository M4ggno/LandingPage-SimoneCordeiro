import { Component, signal } from '@angular/core';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-faq',
  imports: [AnimateOnScroll],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  aberto = signal<number | null>(null);

  constructor(public profile: Profile) {}

  perguntas = [
    {
      pergunta: 'Como funciona a primeira sessão?',
      resposta: 'A primeira sessão é um momento de acolhimento e escuta. É quando você poderá falar sobre o que está vivendo, suas dificuldades, expectativas e o que te levou a buscar acompanhamento psicológico. A partir desse primeiro encontro, é possível compreender melhor a sua necessidade e conversar sobre os próximos passos.'
    },
    {
      pergunta: 'Preciso saber exatamente o que falar na terapia?',
      resposta: 'Não. Você não precisa chegar com tudo organizado ou saber por onde começar. A conversa acontece no seu ritmo, e a condução é feita de forma acolhedora e profissional.'
    },
    {
      pergunta: 'Preciso estar passando por uma crise para procurar terapia?',
      resposta: 'Não. A psicoterapia também pode ser procurada por quem deseja se conhecer melhor, compreender sentimentos, comportamentos e relacionamentos, lidar com mudanças ou desenvolver novas formas de enfrentar situações da vida.'
    },
    {
      pergunta: 'Quanto tempo dura uma sessão?',
      resposta: 'As sessões possuem duração previamente estabelecida, informada no momento do agendamento. A frequência dos encontros é definida de acordo com as necessidades de cada pessoa.'
    },
    {
      pergunta: 'Quanto tempo dura o processo de psicoterapia?',
      resposta: 'Não existe um período igual para todas as pessoas. Cada processo é único e sua duração depende das necessidades, objetivos e evolução de cada paciente.'
    },
    {
      pergunta: 'O que conversamos durante a sessão é sigiloso?',
      resposta: 'Sim. O sigilo profissional é um dos princípios fundamentais do atendimento psicológico. As informações compartilhadas são protegidas conforme os princípios éticos e as normas que regulamentam a profissão.'
    },
    {
      pergunta: 'O atendimento é presencial ou online?',
      resposta: 'Os atendimentos podem acontecer presencialmente ou de forma online, de acordo com a disponibilidade e a necessidade de cada paciente.'
    },
    {
      pergunta: 'Como saber os horários disponíveis e o valor da sessão?',
      resposta: 'Para informações sobre horários, disponibilidade e condições do atendimento, entre em contato diretamente pelo WhatsApp. Assim, você recebe todas as orientações antes do agendamento.'
    },
    {
      pergunta: 'Em quais situações a psicoterapia pode me ajudar?',
      resposta: 'A psicoterapia pode ajudar em diversas situações — ansiedade, relacionamentos, autoestima, mudanças de vida, entre outras demandas. Cada processo é pensado de acordo com o que você está vivendo.'
    },
    {
      pergunta: 'Como faço para agendar minha primeira sessão?',
      resposta: 'É simples. Clique no botão de WhatsApp, entre em contato e consulte os horários disponíveis. Você receberá as orientações necessárias para realizar o agendamento.'
    }
  ];

  toggle(index: number) {
    this.aberto.set(this.aberto() === index ? null : index);
  }
}

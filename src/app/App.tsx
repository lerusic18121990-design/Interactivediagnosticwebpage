import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { text: string; value: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Сколько клиентов вы ведёте сейчас?',
    options: [
      { text: 'пока нет', value: 1 },
      { text: '1–5', value: 1 },
      { text: '6–10', value: 2 },
      { text: '11–20', value: 3 },
      { text: 'больше 20', value: 4 }
    ]
  },
  {
    id: 2,
    question: 'Сколько в среднем платит один клиент?',
    options: [
      { text: 'до 3 тыс', value: 1 },
      { text: '3–5 тыс', value: 2 },
      { text: '5–10 тыс', value: 3 },
      { text: '10 тыс+', value: 4 }
    ]
  },
  {
    id: 3,
    question: 'Сколько часов в день уходит на работу?',
    options: [
      { text: '2–4 часа', value: 1 },
      { text: '5–7 часов', value: 2 },
      { text: '8–10 часов', value: 3 },
      { text: '10+ часов', value: 4 }
    ]
  },
  {
    id: 4,
    question: 'Что входит в стоимость ведения?',
    options: [
      { text: 'только отчётность', value: 1 },
      { text: 'ведение + консультации', value: 2 },
      { text: 'ведение + консультации + кадровые вопросы', value: 3 },
      { text: 'практически всё', value: 4 }
    ]
  },
  {
    id: 5,
    question: 'Как часто клиенты пишут вне рабочего времени?',
    options: [
      { text: 'почти никогда', value: 1 },
      { text: 'иногда', value: 2 },
      { text: 'часто', value: 3 },
      { text: 'постоянно', value: 4 }
    ]
  },
  {
    id: 6,
    question: 'Есть ли чёткие границы услуг?',
    options: [
      { text: 'да', value: 1 },
      { text: 'примерно', value: 2 },
      { text: 'скорее нет', value: 3 },
      { text: 'нет', value: 4 }
    ]
  },
  {
    id: 7,
    question: 'Поднимали ли вы стоимость услуг за последний год?',
    options: [
      { text: 'да', value: 1 },
      { text: 'думаю об этом', value: 2 },
      { text: 'нет', value: 3 },
      { text: 'боюсь поднимать', value: 4 }
    ]
  },
  {
    id: 8,
    question: 'Что чаще всего говорит клиент при разговоре о цене?',
    options: [
      { text: 'нормально', value: 1 },
      { text: 'дорого', value: 2 },
      { text: 'у другого дешевле', value: 3 },
      { text: 'давайте подумаем', value: 4 },
      { text: 'ничего я не спрашивала', value: 1 }
    ]
  },
  {
    id: 9,
    question: 'Сколько клиентов вы могли бы вести комфортно?',
    options: [
      { text: 'до 5', value: 1 },
      { text: '5–10', value: 2 },
      { text: '10–15', value: 3 },
      { text: 'не знаю', value: 4 }
    ]
  },
  {
    id: 10,
    question: 'Есть ли ощущение, что работы становится больше?',
    options: [
      { text: 'нет', value: 1 },
      { text: 'иногда', value: 2 },
      { text: 'часто', value: 3 },
      { text: 'постоянно', value: 4 }
    ]
  }
];

type ResultType = {
  title: string;
  description: string;
  currentPrice: string;
  marketPrice: string;
};

function calculateResult(answers: number[]): ResultType {
  const totalScore = answers.reduce((sum, val) => sum + val, 0);
  const avgScore = totalScore / answers.length;

  if (avgScore >= 3.5) {
    return {
      title: 'Перегруженный бухгалтер',
      description: 'Вы ведёте много клиентов, работаете по 10 часов и выполняете задачи, которые не входят в стоимость ведения.',
      currentPrice: '3 000 – 5 000 ₽',
      marketPrice: '10 000 – 15 000 ₽'
    };
  } else if (avgScore >= 2.5) {
    return {
      title: 'Бухгалтер-исполнитель',
      description: 'Вы аккуратно выполняете работу, но чаще всего вас воспринимают как человека, который просто сдаёт отчётность.',
      currentPrice: '5 000 – 8 000 ₽',
      marketPrice: '8 000 – 12 000 ₽'
    };
  } else if (avgScore >= 1.5) {
    return {
      title: 'Бухгалтер-аутсорсер',
      description: 'Вы уже умеете выстраивать системную работу с клиентами.',
      currentPrice: '8 000 – 12 000 ₽',
      marketPrice: '12 000 – 20 000 ₽'
    };
  } else {
    return {
      title: 'Финансовый партнёр бизнеса',
      description: 'Это бухгалтер, которого воспринимают как специалиста, который помогает бизнесу принимать решения.',
      currentPrice: '12 000 – 20 000 ₽',
      marketPrice: '20 000 – 35 000 ₽'
    };
  }
}

export default function App() {
  const [stage, setStage] = useState<'welcome' | 'test' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setStage('results');
      }, 300);
    }
  };

  const startTest = () => {
    setStage('test');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const result = stage === 'results' ? calculateResult(answers) : null;

  return (
    <div className="min-h-screen bg-[#faf9f7] py-8 px-4 md:py-16">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-[#e8dcc8] rounded-full">
                    <span className="text-[#1e3a5f]">Диагностика</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl text-[#1e3a5f] leading-tight">
                    Сколько на самом деле должны стоить ваши бухгалтерские услуги
                  </h1>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    Многие бухгалтеры ведут клиентов за 3–5 тысяч и думают, что это нормальная цена.
                  </p>

                  <div className="bg-[#f8f6f3] rounded-2xl p-6 space-y-3">
                    <p className="text-[#1e3a5f]">Пройдите диагностику и узнайте:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a572] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">сколько на самом деле должен стоить ваш клиент</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a572] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">почему клиенты начинают просить «сделать всё»</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a572] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">сколько денег вы теряете на своих услугах</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={startTest}
                    className="w-full md:w-auto px-8 py-4 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#2a4a75] transition-colors duration-200 flex items-center justify-center gap-2 group"
                  >
                    Пройти диагностику
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <span className="text-sm text-[#1e3a5f]">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c5a572] to-[#e8dcc8]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
                >
                  <h2 className="text-2xl md:text-3xl text-[#1e3a5f] mb-8">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="grid gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="p-5 bg-[#f8f6f3] hover:bg-[#e8dcc8] rounded-xl text-left transition-all duration-200 border-2 border-transparent hover:border-[#c5a572]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg text-gray-800">{option.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8dcc8] rounded-full">
                    <AlertCircle className="w-5 h-5 text-[#1e3a5f]" />
                    <span className="text-[#1e3a5f]">Ваш результат</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl text-[#1e3a5f]">{result.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{result.description}</p>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-[#fff5f5] rounded-2xl p-6 border-2 border-red-200">
                      <p className="text-sm text-gray-600 mb-2">Средняя цена ваших услуг сейчас:</p>
                      <p className="text-2xl text-red-600">{result.currentPrice}</p>
                    </div>
                    <div className="bg-[#f0f9ff] rounded-2xl p-6 border-2 border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Рыночная стоимость аналогичных услуг:</p>
                      <p className="text-2xl text-[#1e3a5f]">{result.marketPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl text-[#1e3a5f] mb-6">Как выглядит рынок бухгалтерских услуг</h3>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">3 000 ₽</div>
                      <div className="flex-1 h-12 bg-gradient-to-r from-red-100 to-red-50 rounded-lg flex items-center px-4">
                        <span className="text-sm text-gray-700">дешёвый бухгалтер</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">10 000 ₽</div>
                      <div className="flex-1 h-12 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg flex items-center px-4">
                        <span className="text-sm text-gray-700">средняя цена рынка</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">20 000 ₽</div>
                      <div className="flex-1 h-12 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-center px-4">
                        <span className="text-sm text-gray-700">уверенный специалист</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">30 000 ₽</div>
                      <div className="flex-1 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center px-4">
                        <span className="text-sm text-gray-700">дорогой специалист</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4a75] rounded-3xl shadow-lg p-8 md:p-12 text-white">
                <div className="flex items-start gap-4 mb-6">
                  <TrendingUp className="w-8 h-8 text-[#c5a572] flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl mb-2">Сколько денег вы можете терять</h3>
                    <p className="text-blue-100">
                      Если у вас 10 клиентов и каждый платит на 6 000 ₽ меньше рынка
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <p className="text-blue-100 mb-2">это:</p>
                    <p className="text-4xl">60 000 ₽</p>
                    <p className="text-blue-100 mt-1">в месяц</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <p className="text-blue-100 mb-2">или:</p>
                    <p className="text-4xl">720 000 ₽</p>
                    <p className="text-blue-100 mt-1">в год</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl text-[#1e3a5f] mb-6">
                  На вебинаре разберём, как изменить эту ситуацию
                </h3>

                <div className="bg-[#f8f6f3] rounded-2xl p-6 mb-8">
                  <p className="text-[#1e3a5f] mb-4">Вы узнаете:</p>
                  <ul className="space-y-3">
                    {[
                      '7 ошибок бухгалтеров, из-за которых услуги стоят 3–5 тыс',
                      'почему клиенты начинают просить «сделать всё»',
                      'чем дорогой специалист отличается от дешёвого',
                      'как выйти из ценовой гонки',
                      'как выстроить работу так, чтобы клиенты понимали ценность вашей работы'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a572] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full px-8 py-5 bg-[#c5a572] text-white rounded-xl hover:bg-[#b39563] transition-colors duration-200 text-lg">
                  Хочу узнать, как повысить стоимость услуг
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Зарегистрироваться на вебинар
                </p>
              </div>

              <div className="bg-[#f8f6f3] rounded-2xl p-6 text-center">
                <p className="text-gray-700">
                  <span className="text-2xl text-[#1e3a5f]">82%</span> бухгалтеров, прошедших диагностику, недооценивают стоимость своих услуг
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
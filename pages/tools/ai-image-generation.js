import ToolCard from '../../components/ToolCard';

export default function AiImageGeneration() {
  const tools = [
    {
      name: 'Midjourney',
      description: '고품질 AI 이미지 생성기, 디스코드 기반 사용',
      platforms: ['Web', 'Discord'],
      link: 'https://www.midjourney.com/',
    },
    {
      name: 'Leonardo AI',
      description: '게임/콘셉트 아트 특화 이미지 생성 플랫폼',
      platforms: ['Web'],
      link: 'https://leonardo.ai/',
    },
    {
      name: 'Runway ML',
      description: '멀티모달 생성 플랫폼, 영상과 이미지 모두 가능',
      platforms: ['Web', 'iOS', 'Mac'],
      link: 'https://runwayml.com/',
    },
    {
      name: 'HuggingFace Diffusers',
      description: 'Stable Diffusion 기반 오픈소스 이미지 생성 코드',
      platforms: ['Python', 'Mac', 'Windows'],
      link: 'https://huggingface.co/docs/diffusers/index',
    },
    {
      name: 'Playground AI',
      description: '무료 텍스트-이미지 생성 플랫폼',
      platforms: ['Web'],
      link: 'https://playgroundai.com/',
    },
    {
      name: 'InvokeAI',
      description: '로컬에서 직접 Stable Diffusion 실행 가능',
      platforms: ['Windows', 'Mac'],
      link: 'https://invoke.ai/',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">🖼️ AI 이미지 생성</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💡 개요</h2>
        <p className="text-gray-700">
          AI 이미지 생성은 텍스트로부터 이미지를 자동 생성하는 기술입니다. 주요 모델로는 Stable Diffusion, Midjourney, DALL·E가 있으며, 창작, 디자인, 교육 등 다양한 분야에 활용됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🛠 활용 가능한 툴</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📚 사용법</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a href="https://www.youtube.com/watch?v=xyz" className="text-blue-600 underline" target="_blank" rel="noreferrer">
              유튜브: Midjourney 입문 영상
            </a>
          </li>
          <li>
            <a href="https://blog.naver.com/leonardo-tutorial" className="text-blue-600 underline" target="_blank" rel="noreferrer">
              블로그: Leonardo AI 튜토리얼
            </a>
          </li>
          <li>
            <a href="https://docs.runwayml.com/" className="text-blue-600 underline" target="_blank" rel="noreferrer">
              공식 가이드: Runway ML
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🌐 커뮤니티</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Reddit: r/StableDiffusion</li>
          <li>Discord: Midjourney 서버</li>
          <li>Hugging Face Spaces Discussion</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">💬 써먹을 곳</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>콘셉트 아트, 게임 아트 생성</li>
          <li>포스터 및 SNS용 시각 자료 제작</li>
          <li>영상 썸네일 생성</li>
          <li>디자인 시안 빠른 제작</li>
        </ul>
      </section>
    </div>
  );
}

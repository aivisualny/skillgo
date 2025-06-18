import { Tool } from '@/types';

export interface ExtendedTool extends Tool {
  logo?: string; // 로고 이미지 경로
  difficulty?: '입문자 추천' | '프롬프트 필요' | '전문가용';
  recommend?: string; // 추천 상황 예시
  koreanSupport?: boolean; // 한국어 지원 여부
  fileTypes?: string[]; // 지원 파일 형식
  exampleVideoUrl?: string; // 예시 영상 URL
}

export const tools: ExtendedTool[] = [
  {
    id: '1',
    name: 'Adobe Premiere Pro',
    description: '전문적인 비디오 편집을 위한 업계 표준 소프트웨어입니다.',
    category: '비디오 편집',
    platforms: [
      { name: 'Windows', url: 'https://www.adobe.com/products/premiere/windows.html' },
      { name: 'macOS', url: 'https://www.adobe.com/products/premiere/mac.html' }
    ],
    popularity: 95,
    imageUrl: '/images/premiere-pro.jpg',
    tutorialUrl: 'https://www.adobe.com/kr/products/premiere/tutorials.html',
    features: [
      '타임라인 편집',
      '색보정',
      '오디오 편집',
      '효과 및 전환',
      '자동 자막 생성',
      '다중 카메라 편집',
      'VR 편집 지원'
    ],
    pricing: {
      type: 'Paid',
      price: 24.99,
      currency: 'USD'
    },
    tags: ['비디오 편집', '프로페셔널', 'Adobe', '영상 제작'],
    logo: '/images/premiere-pro-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '2',
    name: 'DaVinci Resolve',
    description: '무료로도 강력한 기능을 제공하는 영상 편집 및 색보정 툴.',
    category: '비디오 편집',
    platforms: [
      { name: 'Windows' },
      { name: 'macOS' },
      { name: 'Linux' }
    ],
    popularity: 90,
    imageUrl: '/images/davinci-resolve.png',
    tutorialUrl: 'https://www.blackmagicdesign.com/kr/products/davinciresolve/training',
    features: [
      '색보정',
      'Fusion VFX',
      'Fairlight 오디오',
      '클라우드 협업',
      '무료 버전 제공'
    ],
    pricing: {
      type: 'Freemium'
    },
    tags: ['비디오 편집', '무료', '색보정', 'DaVinci'],
    logo: '/images/davinci-resolve-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '3',
    name: 'RunwayML',
    description: 'AI 기반 영상/이미지 편집 및 생성 플랫폼. GAN, Stable Diffusion 등 다양한 AI 모델 지원.',
    category: 'AI 생성',
    platforms: [
      { name: 'Web', url: 'https://runwayml.com/' }
    ],
    popularity: 85,
    imageUrl: '/images/runwayml.png',
    tutorialUrl: 'https://learn.runwayml.com/',
    features: [
      'AI 영상 생성',
      '이미지 인페인팅',
      'Stable Diffusion',
      'GAN',
      '웹 기반'
    ],
    pricing: {
      type: 'Freemium'
    },
    tags: ['AI', 'GAN', 'Stable Diffusion', '이미지 생성', '영상 생성'],
    logo: '/images/runwayml-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '4',
    name: 'SQLD 연습 사이트',
    description: 'SQLD 자격증 실전 연습을 위한 무료 웹 서비스.',
    category: '자격증',
    platforms: [
      { name: 'Web', url: 'https://sqld.kr/' }
    ],
    popularity: 80,
    imageUrl: '/images/sqld.png',
    tutorialUrl: 'https://sqld.kr/guide',
    features: [
      '실전 문제 제공',
      '자동 채점',
      '모의고사',
      '커뮤니티'
    ],
    pricing: {
      type: 'Free'
    },
    tags: ['SQLD', '자격증', 'DB', '연습'],
    logo: '/images/sqld-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '5',
    name: 'Figma',
    description: '웹 기반 UI/UX 디자인 협업 툴. 실시간 협업, 플러그인, 프로토타이핑 지원.',
    category: '디자인',
    platforms: [
      { name: 'Web', url: 'https://figma.com/' },
      { name: 'Windows' },
      { name: 'macOS' }
    ],
    popularity: 92,
    imageUrl: '/images/figma.png',
    tutorialUrl: 'https://help.figma.com/hc/ko',
    features: [
      '실시간 협업',
      '프로토타이핑',
      '플러그인',
      '버전 관리'
    ],
    pricing: {
      type: 'Freemium'
    },
    tags: ['디자인', 'UI', 'UX', '협업', 'Figma'],
    logo: '/images/figma-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '6',
    name: 'RunwayML',
    description: '텍스트로 동영상을 만들 수 있는 대표적인 AI 툴',
    category: 'AI 비디오 생성',
    platforms: [ { name: 'Web', url: 'https://runwayml.com/' } ],
    popularity: 85,
    imageUrl: '/images/runwayml.png',
    logo: '/images/runwayml-logo.png',
    tutorialUrl: 'https://learn.runwayml.com/',
    features: ['AI 영상 생성', '이미지 인페인팅', 'GAN', 'Stable Diffusion'],
    pricing: { type: 'Freemium' },
    tags: ['AI', '비디오 생성', 'GAN', 'Stable Diffusion'],
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '7',
    name: 'Kaiber',
    description: 'AI로 동영상을 자동 생성하는 플랫폼',
    category: 'AI 비디오 생성',
    platforms: [ { name: 'Web', url: 'https://kaiber.ai/' } ],
    popularity: 70,
    imageUrl: '/images/kaiber.png',
    logo: '/images/kaiber-logo.png',
    tutorialUrl: 'https://help.kaiber.ai/en/',
    features: ['AI 영상 생성', '스타일 변환'],
    pricing: { type: 'Freemium' },
    tags: ['AI', '비디오 생성'],
    difficulty: '프롬프트 필요',
    recommend: '✅ 다양한 스타일 변환\n❌ 한국어 프롬프트 미지원',
    koreanSupport: false,
    fileTypes: ['mp4'],
    exampleVideoUrl: 'https://www.youtube.com/embed/KaiberExample'
  },
  {
    id: '8',
    name: 'Midjourney',
    description: 'AI 기반 이미지 생성 플랫폼',
    category: 'AI 이미지 생성',
    platforms: [ { name: 'Web', url: 'https://www.midjourney.com/' } ],
    popularity: 95,
    imageUrl: '/images/midjourney.png',
    tutorialUrl: 'https://docs.midjourney.com/',
    features: ['AI 이미지 생성', '프롬프트 기반'],
    pricing: { type: 'Paid', price: 10, currency: 'USD' },
    tags: ['AI', '이미지 생성'],
    logo: '/images/midjourney-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['jpg', 'png'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '9',
    name: 'Stable Diffusion',
    description: '오픈소스 AI 이미지 생성 모델',
    category: 'AI 이미지 생성',
    platforms: [ { name: 'Web', url: 'https://stablediffusionweb.com/' } ],
    popularity: 90,
    imageUrl: '/images/stablediffusion.png',
    tutorialUrl: 'https://stablediffusionweb.com/guide',
    features: ['AI 이미지 생성', '오픈소스'],
    pricing: { type: 'Free' },
    tags: ['AI', '이미지 생성', 'Stable Diffusion'],
    logo: '/images/stablediffusion-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['jpg', 'png'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '10',
    name: 'ElevenLabs',
    description: 'AI 음성 합성(TTS) 플랫폼',
    category: 'AI 음성 생성',
    platforms: [ { name: 'Web', url: 'https://elevenlabs.io/' } ],
    popularity: 80,
    imageUrl: '/images/elevenlabs.png',
    tutorialUrl: 'https://help.elevenlabs.io/',
    features: ['AI 음성 생성', 'TTS', '다국어 지원'],
    pricing: { type: 'Freemium' },
    tags: ['AI', '음성 생성', 'TTS'],
    logo: '/images/elevenlabs-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp3'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '11',
    name: 'ChatGPT',
    description: 'OpenAI의 대표적인 AI 채팅 서비스',
    category: 'AI 채팅',
    platforms: [ { name: 'Web', url: 'https://chat.openai.com/' } ],
    popularity: 100,
    imageUrl: '/images/chatgpt.png',
    tutorialUrl: 'https://help.openai.com/',
    features: ['AI 채팅', 'GPT-4', '다국어 지원'],
    pricing: { type: 'Freemium' },
    tags: ['AI', '채팅', 'GPT'],
    logo: '/images/chatgpt-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  },
  {
    id: '12',
    name: 'Claude',
    description: 'Anthropic의 AI 채팅 서비스',
    category: 'AI 채팅',
    platforms: [ { name: 'Web', url: 'https://claude.ai/' } ],
    popularity: 75,
    imageUrl: '/images/claude.png',
    tutorialUrl: 'https://support.anthropic.com/',
    features: ['AI 채팅', 'Anthropic', '다국어 지원'],
    pricing: { type: 'Freemium' },
    tags: ['AI', '채팅', 'Claude'],
    logo: '/images/claude-logo.png',
    difficulty: '입문자 추천',
    recommend: '✅ 영상 편집 경험 없이도 가능\n✅ 한국어 프롬프트 지원',
    koreanSupport: true,
    fileTypes: ['mp4', 'mov'],
    exampleVideoUrl: 'https://www.youtube.com/embed/1Q0Q8Qe4QnA'
  }
]; 
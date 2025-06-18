import { AITool, AIToolCategory } from '../types/ai-tools';

export const aiTools: AITool[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '디스코드 기반의 고품질 이미지 생성 AI',
    category: 'image',
    platform: ['web', 'discord'],
    url: 'https://www.midjourney.com',
    features: ['고품질 이미지 생성', '디스코드 통합', '실시간 피드백'],
    pricing: 'paid',
    community: [
      {
        platform: 'Discord',
        url: 'https://discord.gg/midjourney'
      }
    ],
    tutorials: [
      {
        title: 'Midjourney 입문 가이드',
        url: 'https://www.youtube.com/watch?v=example'
      }
    ]
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    description: '게임/콘셉트 아트 특화 AI 이미지 생성 도구',
    category: 'image',
    platform: ['web'],
    url: 'https://leonardo.ai',
    features: ['게임 아트 생성', '콘셉트 아트', '스타일 프리셋'],
    pricing: 'freemium',
    tutorials: [
      {
        title: 'Leonardo AI 튜토리얼',
        url: 'https://blog.naver.com/example'
      }
    ]
  },
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: '영상 생성도 가능한 멀티모달 AI 플랫폼',
    category: 'multimodal',
    platform: ['web', 'app'],
    url: 'https://runwayml.com',
    features: ['이미지 생성', '영상 편집', 'AI 모델 학습'],
    pricing: 'paid',
    tutorials: [
      {
        title: 'Runway 공식 가이드',
        url: 'https://docs.runwayml.com'
      }
    ]
  }
];

export const categories: AIToolCategory[] = [
  {
    id: 'image-generation',
    name: '이미지 생성',
    description: '텍스트로부터 이미지를 생성하는 AI 도구들',
    tools: aiTools.filter(tool => tool.category === 'image')
  },
  {
    id: 'multimodal',
    name: '멀티모달',
    description: '이미지와 영상을 모두 다루는 AI 도구들',
    tools: aiTools.filter(tool => tool.category === 'multimodal')
  }
]; 
import { AITool } from '../types/ai-tools';
import styles from '../styles/AIToolCard.module.css';

interface AIToolCardProps {
  tool: AITool;
}

export default function AIToolCard({ tool }: AIToolCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{tool.name}</h3>
      <p className={styles.description}>{tool.description}</p>
      
      <div className={styles.details}>
        <div className={styles.platforms}>
          <span className={styles.label}>플랫폼:</span>
          {tool.platform.map(p => (
            <span key={p} className={styles.platform}>{p}</span>
          ))}
        </div>
        
        <div className={styles.features}>
          <span className={styles.label}>주요 기능:</span>
          <ul>
            {tool.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        {tool.community && (
          <div className={styles.community}>
            <span className={styles.label}>커뮤니티:</span>
            <ul>
              {tool.community.map(comm => (
                <li key={comm.platform}>
                  <a href={comm.url} target="_blank" rel="noopener noreferrer">
                    {comm.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tool.tutorials && (
          <div className={styles.tutorials}>
            <span className={styles.label}>튜토리얼:</span>
            <ul>
              {tool.tutorials.map(tutorial => (
                <li key={tutorial.title}>
                  <a href={tutorial.url} target="_blank" rel="noopener noreferrer">
                    {tutorial.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          웹사이트 방문
        </a>
      </div>
    </div>
  );
} 
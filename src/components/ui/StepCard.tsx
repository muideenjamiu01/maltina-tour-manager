import styles from "@/styles/HowVotingWorks.module.css";

interface Props {
  step: string;
  title: string;
  description: string;
}

export default function StepCard({ step, title, description }: Props) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{step}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

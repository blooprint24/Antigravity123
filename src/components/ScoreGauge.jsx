import React from 'react';

const ScoreGauge = ({ currentScore, potentialScore, size = 200 }) => {
    const percentage = (currentScore / 850) * 100;
    const potentialPercentage = (potentialScore / 850) * 100;
    const circumference = 2 * Math.PI * 70;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const potentialStrokeDashoffset = circumference - (potentialPercentage / 100) * circumference;

    const getScoreColor = (score) => {
        if (score >= 720) return 'var(--color-success)';
        if (score >= 650) return 'var(--color-warning)';
        return 'var(--color-danger)';
    };

    return (
        <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r="70"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="12"
                />

                {/* Potential score circle (lighter) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r="70"
                    fill="none"
                    stroke={getScoreColor(potentialScore)}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={potentialStrokeDashoffset}
                    strokeLinecap="round"
                    opacity="0.3"
                    style={{
                        transition: 'stroke-dashoffset 1s ease-in-out'
                    }}
                />

                {/* Current score circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r="70"
                    fill="none"
                    stroke={getScoreColor(currentScore)}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 1s ease-in-out'
                    }}
                />
            </svg>

            {/* Score text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: 'var(--font-size-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: getScoreColor(currentScore),
                    lineHeight: 1
                }}>
                    {currentScore}
                </div>
                <div style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-tertiary)',
                    marginTop: 'var(--spacing-xs)'
                }}>
                    Current Score
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;

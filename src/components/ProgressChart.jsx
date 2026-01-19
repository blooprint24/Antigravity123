import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data }) => {
    // Default data if none provided
    const chartData = data || [
        { month: 'Jan', score: 580 },
        { month: 'Feb', score: 590 },
        { month: 'Mar', score: 605 },
        { month: 'Apr', score: 620 },
        { month: 'May', score: 640 },
        { month: 'Jun', score: 665 }
    ];

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                        dataKey="month"
                        stroke="var(--color-text-tertiary)"
                        style={{ fontSize: 'var(--font-size-sm)' }}
                    />
                    <YAxis
                        domain={[300, 850]}
                        stroke="var(--color-text-tertiary)"
                        style={{ fontSize: 'var(--font-size-sm)' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-bg-primary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-primary)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--color-primary)', r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;

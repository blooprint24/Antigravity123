import React, { useState } from 'react';

const FAQSection = () => {
    const faqs = [
        {
            question: "Is ClearMark Pro really free?",
            answer: "Yes! ClearMark Pro is 100% free to use for both personal and commercial projects. No signup or credit card required."
        },
        {
            question: "Which image formats are supported?",
            answer: "We currently support PNG, JPG, JPEG, and WebP images up to 10MB each."
        },
        {
            question: "Does it work with complex watermarks?",
            answer: "Our AI is trained on millions of images and can handle most watermarks, including semi-transparent ones, text, and logos. For very complex cases, our manual brush tool provides the ultimate control."
        },
        {
            question: "Is my data private and secure?",
            answer: "Absolutely. All image processing happens locally in your browser where possible, and we never store your original or processed images on our servers."
        },
        {
            question: "Can I process multiple images at once?",
            answer: "Yes! ClearMark Pro supports batch processing. Simply drag all your images at once to start a queue."
        }
    ];

    return (
        <section className="faq-section py-3xl">
            <div className="container container-narrow">
                <div className="text-center mb-3xl">
                    <h2 className="text-gradient">Frequently Asked Questions</h2>
                </div>

                <div className="flex flex-col gap-md">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} faq={faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="card"
            style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                cursor: 'pointer'
            }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-center">
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{faq.question}</h4>
                <span style={{
                    fontSize: '1.5rem',
                    lineHeight: '1',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform var(--transition-base)',
                    color: 'var(--color-primary)'
                }}>
                    +
                </span>
            </div>

            {isOpen && (
                <div className="mt-md animate-fade-in">
                    <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                        {faq.answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FAQSection;

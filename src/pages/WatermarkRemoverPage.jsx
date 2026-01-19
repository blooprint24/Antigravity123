import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ImageUploader from '../components/ImageUploader';
import ImageEditor from '../components/ImageEditor';
import FeatureShowcase from '../components/FeatureShowcase';
import HowItWorks from '../components/HowItWorks';
import FAQSection from '../components/FAQSection';

const WatermarkRemoverPage = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [showEditor, setShowEditor] = useState(false);

    const handleImagesUploaded = (images) => {
        setUploadedImages(images);
        if (images.length > 0) {
            setCurrentImage(images[0]);
            setShowEditor(true);
        }
    };

    const handleBackToUpload = () => {
        setShowEditor(false);
        setCurrentImage(null);
    };

    return (
        <div className="watermark-remover-page">
            {!showEditor ? (
                <>
                    <HeroSection />
                    <div className="container mt-3xl mb-3xl">
                        <ImageUploader onImagesUploaded={handleImagesUploaded} />
                    </div>
                    <FeatureShowcase />
                    <HowItWorks />
                    <FAQSection />
                </>
            ) : (
                <div className="container mt-xl mb-3xl">
                    <button
                        className="btn btn-outline mb-lg"
                        onClick={handleBackToUpload}
                    >
                        ← Back to Upload
                    </button>
                    <ImageEditor
                        image={currentImage}
                        allImages={uploadedImages}
                        onImageChange={setCurrentImage}
                    />
                </div>
            )}
        </div>
    );
};

export default WatermarkRemoverPage;

import React from "react";
import { Button } from "./ui/button";

const SurveyButton = () => {
    return (
        <Button id="survey-button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Feedback
        </Button>
    );
};

export default SurveyButton;
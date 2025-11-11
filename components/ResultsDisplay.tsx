
import React, { useState, useCallback } from 'react';
import type { CalculationResult, FormData } from '../types';
import { getAIAssistantAdvice } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface ResultsDisplayProps {
  result: CalculationResult;
  formData: FormData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, formData }) => {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAdvice = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAdvice('');
    try {
      const aiAdvice = await getAIAssistantAdvice(formData, result);
      setAdvice(aiAdvice);
    } catch (err) {
      setError('Failed to get advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, result]);

  const formatNumber = (num: number) => Math.round(num).toLocaleString();
  
  const adviceHtml = advice
    .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') // Bold
    .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') // Italic
    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/\* (.*)/g, '<li class="ml-5 list-disc">$1</li>')
    .replace(/(\r\n|\n|\r)/g, '<br />')
    .replace(/(<li.*?>.*?<\/li>)(?!<li)/g, '<ul>$1</ul>')
    .replace(/<br \/><ul>/g, '<ul>')
    .replace(/<\/ul><br \/>/g, '</ul>');


  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Results</h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-lg font-medium text-blue-800">Calories to Maintain Weight</p>
          <p className="text-4xl font-bold text-blue-600">{formatNumber(result.maintenance)}</p>
          <p className="text-sm text-blue-700">calories/day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 text-center mb-2">For Weight Loss</h3>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-xs text-green-700">0.5 lb/week</p>
                <p className="font-bold text-lg text-green-600">{formatNumber(result.loss)}</p>
              </div>
              <div>
                <p className="text-xs text-green-700">1 lb/week</p>
                <p className="font-bold text-lg text-green-600">{formatNumber(result.extremeLoss)}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800 text-center mb-2">For Weight Gain</h3>
             <div className="flex justify-around text-center">
              <div>
                <p className="text-xs text-orange-700">0.5 lb/week</p>
                <p className="font-bold text-lg text-orange-600">{formatNumber(result.gain)}</p>
              </div>
              <div>
                <p className="text-xs text-orange-700">1 lb/week</p>
                <p className="font-bold text-lg text-orange-600">{formatNumber(result.extremeGain)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Powered Assistant</h3>
        <p className="text-sm text-slate-600 mb-4">Get personalized tips and a sample meal plan based on your results.</p>
        <button
          onClick={handleGetAdvice}
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 rounded-md border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Getting Your Plan...
            </>
          ) : (
            <>
              <SparklesIcon />
              Get AI Advice
            </>
          )}
        </button>

        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
        
        {advice && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg prose prose-sm max-w-none">
             <div dangerouslySetInnerHTML={{ __html: adviceHtml }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;

import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";

export const assessPronunciation = async (audioFilePath, referenceText) => {
  try {
    // Replace with your Azure credentials
    const subscriptionKey =
      "296NrfagLOJgUGIEOuHSxAfxIyEMqYY12K0QxaSbJqcusxw5wMINJQQJ99BBACF24PCXJ3w3AAAYACOGPcRC";
    const serviceRegion = "uaenorth";

    // Configure Azure Speech Service
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true // Enable mispronunciation detection
    );

    console.log("pronunciationConfig => ", pronunciationConfig);

    // Create audio config from file
    const audioConfig = sdk.AudioConfig.fromWavFileInput(
      fs.readFileSync(audioFilePath)
    );

    console.log("audioConfig => ", audioConfig);
    // Create Speech Recognizer
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    console.log("recognizer => ", recognizer);
    // Apply pronunciation assessment config
    pronunciationConfig.applyTo(recognizer);

    console.log("applying... ")
    // Perform speech recognition
    return new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync((result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          const pronunciationResult =
            sdk.PronunciationAssessmentResult.fromResult(result);
          const assessment = {
            recognizedText: result.text,
            accuracyScore: pronunciationResult.accuracyScore,
            fluencyScore: pronunciationResult.fluencyScore,
            completenessScore: pronunciationResult.completenessScore,
            pronunciationScore: pronunciationResult.pronunciationScore,
          };
          resolve(assessment);
        } else {
          reject(
            new Error(`Speech recognition failed: ${result.errorDetails}`)
          );
        }
        recognizer.close();
      });
    });
  } catch (error) {
    console.error("Error in pronunciation assessment:", error);
    throw error;
  }
};

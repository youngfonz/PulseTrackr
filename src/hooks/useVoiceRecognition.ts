'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseVoiceRecognitionReturn {
  transcript: string
  isListening: boolean
  isSupported: boolean
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Check browser support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'
      }
    }
  }, [])

  // Setup event handlers
  useEffect(() => {
    const recognition = recognitionRef.current
    if (!recognition) return

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript)
        setIsListening(false)
      } else if (interimTranscript) {
        setTranscript(interimTranscript)
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)

      let errorMessage = 'Voice recognition failed. Please try again.'

      if (event.error === 'not-allowed') {
        errorMessage = 'Microphone access denied. Please enable microphone permissions.'
      } else if (event.error === 'no-speech') {
        errorMessage = 'No speech detected. Please try again.'
      } else if (event.error === 'network') {
        errorMessage = 'Network error. Please check your connection.'
      }

      setError(errorMessage)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onstart = () => {
      setError(null)
      setIsListening(true)
    }

    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) {
      setError('Speech recognition is not supported in this browser.')
      return
    }

    try {
      setError(null)
      setTranscript('')
      recognition.start()
    } catch (err) {
      console.error('Error starting recognition:', err)
      setError('Failed to start voice recognition. Please try again.')
    }
  }, [])

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current
    if (recognition) {
      recognition.stop()
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  }
}

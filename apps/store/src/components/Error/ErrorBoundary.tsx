import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

interface ErrorBoundaryProps {
    children: ReactNode; // Типизация для детей компонента
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

    static getDerivedStateFromError(error: Error) {
        // Обновляем состояние для рендеринга запасного UI
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Логируем ошибку, если нужно
        console.error("Ошибка:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-notification">Произошла ошибка: {this.state.errorMessage}</div>;
        }

        return this.props.children; // Рендерим дочерние компоненты
    }
}

export default ErrorBoundary;

export type NotifyType = 'error' | 'information' | 'success';

export type NotificationState = {
    isVisible: boolean;
    text: string;
    type: NotifyType;
    duration?: number;
};
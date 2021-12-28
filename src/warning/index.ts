export default function warning(condition: boolean, message: string) {
    if (console) {
        if (condition) {
            console.error(`Warning: ${message}`);
        }
    }
}

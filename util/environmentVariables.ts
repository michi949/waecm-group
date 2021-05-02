export const getEnvironmentVariable = (name: string): string => {
    return process.env[name];
};
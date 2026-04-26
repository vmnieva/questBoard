import pkg from '../../../package.json';

export const environment = {
  appName: "QuestBoard",
  version: pkg.version || "0.1.0",
  author: "@vmnieva",
  year: new Date().getFullYear()
};

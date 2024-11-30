const formatNotification = (title, message) => {
  return {
    title,
    message,
    timestamp: new Date().toISOString(),
  };
};

module.exports = { formatNotification };

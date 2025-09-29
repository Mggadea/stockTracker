   const getStatusInfo = (connectionStatus: any) => {
    switch (connectionStatus) {
      case 'connected': 
        return { color: '#1aff92', text: 'live' };
      case 'connecting': 
        return { color: '#ffaa1a', text: 'connecting' };
      case 'error': 
        return { color: '#ff1a1a', text: 'error' };
      default: 
        return { color: '#666', text: 'disconnected' };
    }
  };

  export default getStatusInfo
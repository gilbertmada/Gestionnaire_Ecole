const config = {
    servers: {
      apiUrl: `${process.env.REACT_APP_REST_API_URL}`,
      apiUrlSocket: `${process.env.REACT_APP_REST_API_URL_SOCKET}`,
      apiUrlTekSat: 'https://api-tiers.teksat.fr/api/v1/Auth/login',
      apiUrlTekSatFlotte: 'https://api-tiers.teksat.fr/api/v1/Clients/flotte',
    },
  };
  
  export default config;
  
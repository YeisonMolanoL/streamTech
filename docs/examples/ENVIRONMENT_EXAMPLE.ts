// EJEMPLO: Cómo configurar environment.ts para apuntar al backend

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  
  // ✅ URL del backend (ajustar según tu configuración)
  apiUrl: 'http://localhost:8080',
  
  // URLs específicos por módulo
  codeReception: {
    baseUrl: 'http://localhost:8080/api/code-reception',
    getCodeEndpoint: '/get-code',
    addEmailEndpoint: '/admin/add-email-account',
    removeEmailEndpoint: '/admin/email-account',
    healthEndpoint: '/health'
  }
};

/* 
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';

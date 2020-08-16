interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

// console.log(`process.env.MAIL_DRIVER: ${process.env.MAIL_DRIVER}`);

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  // criar o dominio e depois configurar através do video informado abaixo:
  // Nível 04 => Finalizando Back-End do App => E-mails pelo Amazon SES
  defaults: {
    from: {
      name: 'Fábio Picoli Jr da FP17',
      email: 'fabiopicolijr@meudominio.com',
    },
  },
} as IMailConfig;

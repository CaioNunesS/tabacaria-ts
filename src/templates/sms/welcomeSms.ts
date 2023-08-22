type Iwelcome = { name: string };

export const welcomeSMSTemplate = async ({ name }: Iwelcome) => {
  return `
    Hello, ${name}
    Welcome in our page
    Thank you for subscribe in our Site
    `;
};

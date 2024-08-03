import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
if (!key || key === undefined) throw new Error('send key not found');

const resend = new Resend(key);

const domain = process.env.NEXT_PUBLIC_BASE_URL;

if (!domain || domain === undefined) throw new Error('no url link found');

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA Code: ${token}	</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email address',
    html: `<h1>Verify your emil address</h1>
           <p>Click the link to verify your email address </p>
          <a href='${link}'>Verify email</a>
          `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const link = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<h1>You have requested reset password </h1>
           <p>Click the link to reset password </p>
          <a href='${link}'>Reset password</a>
          `,
  });
};

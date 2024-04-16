import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

interface VerificationEmailProps {
  username: string;
  otp: string;
} 
export default function VerificationEmail({username,otp}: VerificationEmailProps) {
  return (
    <Html>
      <h1>Hi {username},</h1>
      <p>
        Your verification code is <strong>{otp}</strong>.
      </p>
      <Button href="https://example.com/verify" target="_blank">
        Verify your email
      </Button>
    </Html>
  );
}
'use client';

import { type SyntheticEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h13M11.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="m6 14.5 5 5L22 8.5" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg aria-hidden="true" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M18 10a7.5 7.5 0 0 1-11.1 6.6L3 18l1.3-3.8A7.5 7.5 0 1 1 18 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8.5h7M7 11.5h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5c.3 2.8 1.7 4.2 4.5 4.5C8.7 6.3 7.3 7.7 7 10.5 6.7 7.7 5.3 6.3 2.5 6 5.3 5.7 6.7 4.3 7 1.5Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/FO8vqJtFceI2nDTQbEuzwV';

type MemberProfile = {
  name: string;
  email: string;
  phone: string;
};

const emptyProfile: MemberProfile = {
  name: '',
  email: '',
  phone: '',
};

export function OnboardingForm() {
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function updateField(field: keyof MemberProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanProfile = {
      name: profile.name.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
    };

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanProfile),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'We could not save your details.');
      }

      setProfile(cleanProfile);
      setIsComplete(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not save your details.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div className="onboarding-success" aria-live="polite">
        <div className="success-mark" aria-hidden="true">
          <CheckIcon />
        </div>
        <span className="form-step-label">You&apos;re registered</span>
        <h3>Meet the crew.</h3>
        <p>
          {profile.name.split(' ')[0]}, your details are saved. Join the official group for workshop and event updates.
        </p>

        <a
          className="whatsapp-button"
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageIcon />
          Join the WhatsApp group
          <ArrowRightIcon />
        </a>

      </div>
    );
  }

  return (
    <form className="onboarding-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div className="form-step-label">
          <SparkleIcon /> Your details
        </div>
      </div>

      <div className="form-fields">
        <label className="form-field" htmlFor="member-name">
          <span>Your name</span>
          <Input
            className="onboarding-input"
            id="member-name"
            name="name"
            type="text"
            value={profile.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Ada Lovelace"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
          />
        </label>

        <label className="form-field" htmlFor="member-email">
          <span>Email address</span>
          <Input
            className="onboarding-input"
            id="member-email"
            name="email"
            type="email"
            value={profile.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="you@college.edu"
            autoComplete="email"
            maxLength={120}
            required
          />
        </label>

        <label className="form-field" htmlFor="member-phone">
          <span>Contact number</span>
          <Input
            className="onboarding-input"
            id="member-phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
            minLength={7}
            maxLength={20}
            required
          />
        </label>
      </div>

      <Button className="onboarding-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving…' : 'Continue to WhatsApp'}
        <ArrowRightIcon />
      </Button>

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <p className="form-privacy">
        Your details are saved by Hackathon Club.
      </p>
    </form>
  );
}

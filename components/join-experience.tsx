'use client';

import { type SyntheticEvent, useEffect, useState } from 'react';

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

function LockIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3.5" y="7.5" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 7.5V5a3 3 0 0 1 6 0v2.5" stroke="currentColor" strokeWidth="1.4" />
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

// Add the official group invite here when it is available.
const WHATSAPP_GROUP_URL = '';

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

  function updateField(field: keyof MemberProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanProfile = {
      name: profile.name.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
    };

    window.localStorage.setItem('hackathon-club-profile', JSON.stringify(cleanProfile));
    setProfile(cleanProfile);
    setIsComplete(true);
  }

  if (isComplete) {
    return (
      <div className="onboarding-success" aria-live="polite">
        <div className="success-mark" aria-hidden="true">
          <CheckIcon />
        </div>
        <span className="form-step-label">Details saved locally</span>
        <h3>WhatsApp is the final step.</h3>
        <p>
          Nice one, {profile.name.split(' ')[0]}. Nothing has been sent or
          registered yet. Once the official invite is connected, the button
          below becomes your way into the group.
        </p>

        {WHATSAPP_GROUP_URL ? (
          <a
            className="whatsapp-button"
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <MessageIcon />
            Join the WhatsApp group
            <ArrowRightIcon />
          </a>
        ) : (
          <button className="whatsapp-button whatsapp-button-locked" type="button" disabled>
            <MessageIcon />
            WhatsApp invite not connected yet
            <LockIcon />
          </button>
        )}

        <button className="edit-profile-button" type="button" onClick={() => setIsComplete(false)}>
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form className="onboarding-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div className="form-step-label">
          <SparkleIcon /> Step 01 · Your details
        </div>
        <p>Thirty seconds. That&apos;s it.</p>
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

      <Button className="onboarding-submit" type="submit">
        Save details on this device
        <ArrowRightIcon />
      </Button>

      <p className="form-privacy">
        This demo does not send or register your details. They stay in this
        browser until the club connects its WhatsApp invite.
      </p>
    </form>
  );
}

export function MobileJoinDock() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isNearEnd, setIsNearEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const endSections = [
      document.querySelector('.join-gate-button'),
      document.getElementById('join'),
      document.querySelector('footer'),
    ].filter((section): section is HTMLElement => Boolean(section));

    const visibility = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting));
        setIsNearEnd([...visibility.values()].some(Boolean));
      },
      { threshold: 0.01 },
    );

    endSections.forEach((section) => observer.observe(section));

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => setIsHeroVisible(entry.isIntersecting),
          { threshold: 0.08 },
        )
      : null;

    if (hero) heroObserver?.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
    };
  }, []);

  function handleJoinClick() {
    document.getElementById('join-gate')?.scrollIntoView({ behavior: 'smooth' });
  }

  const isDockHidden = isHeroVisible || isNearEnd;

  return (
    <div
      aria-hidden={isDockHidden}
      className={`mobile-join-dock${isDockHidden ? ' is-hidden' : ''}`}
      inert={isDockHidden}
    >
      <Button
        className="mobile-join-button"
        type="button"
        tabIndex={isDockHidden ? -1 : 0}
        onClick={handleJoinClick}
      >
        <span>Join now</span>
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

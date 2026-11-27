// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FootballRain } from '@/components/football-rain';
import { PhoneShowcase, type PhoneSlide } from '@/components/phone-showcase';
import { ScoreGauge } from '@/components/score-gauge';

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: reduce,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );
}

const slides: PhoneSlide[] = [
  {
    id: 'a',
    label: 'Alpha',
    name: 'Alpha project',
    kind: 'Personal',
    light: '/a-l.png',
    dark: '/a-d.png',
    width: 780,
    height: 1688,
    alt: 'Alpha screen',
    href: '/en/work/a',
  },
  {
    id: 'b',
    label: 'Beta',
    name: 'Beta project',
    kind: 'Work',
    light: '/b-l.png',
    dark: '/b-d.png',
    width: 780,
    height: 1688,
    alt: 'Beta screen',
  },
];

const copy = {
  label: 'Previews',
  choose: 'Choose a project',
  pause: 'Pause',
  play: 'Play',
  caseStudy: 'Read the case study',
};
const badges = { top: 'WCAG 2.2 AA', bottom: 'Lighthouse 100' };

describe('PhoneShowcase', () => {
  beforeEach(() => {
    mockReducedMotion(false);
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts on the first project and links to its case study', () => {
    render(<PhoneShowcase slides={slides} copy={copy} badges={badges} />);
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: /Read the case study/ })).toHaveAttribute('href', '/en/work/a');
  });

  it('advances on its own until the visitor picks a project', async () => {
    render(<PhoneShowcase slides={slides} copy={copy} badges={badges} />);
    act(() => void vi.advanceTimersByTime(5100));
    expect(screen.getByRole('button', { name: 'Beta' })).toHaveAttribute('aria-current', 'true');

    await userEvent.click(screen.getByRole('button', { name: 'Alpha' }));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-current', 'true');
    act(() => void vi.advanceTimersByTime(12000));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByRole('link', { name: /Read the case study/ })).toHaveAttribute('href', '/en/work/a');
  });

  it('can be paused and resumed', async () => {
    render(<PhoneShowcase slides={slides} copy={copy} badges={badges} />);
    await userEvent.click(screen.getByRole('button', { name: 'Pause' }));
    act(() => void vi.advanceTimersByTime(12000));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('does not rotate or offer a pause button when reduced motion is requested', () => {
    mockReducedMotion(true);
    render(<PhoneShowcase slides={slides} copy={copy} badges={badges} />);
    act(() => void vi.advanceTimersByTime(12000));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByRole('button', { name: 'Pause' })).not.toBeInTheDocument();
  });
});

describe('ScoreGauge', () => {
  it('exposes the score as a single labelled image', () => {
    render(<ScoreGauge label="SEO" score={98} description="SEO: 98 out of 100" />);
    expect(screen.getByRole('img', { name: 'SEO: 98 out of 100' })).toBeInTheDocument();
  });
});

describe('FootballRain', () => {
  beforeEach(() => {
    mockReducedMotion(false);
  });
  afterEach(() => vi.unstubAllGlobals());

  const konami = '{ArrowUp}{ArrowUp}{ArrowDown}{ArrowDown}{ArrowLeft}{ArrowRight}{ArrowLeft}{ArrowRight}ba';

  it('only appears after the Konami code', async () => {
    const { container } = render(<FootballRain />);
    await userEvent.keyboard('{ArrowUp}{ArrowDown}ba');
    expect(container).toBeEmptyDOMElement();
    await userEvent.keyboard(konami);
    expect(container.querySelectorAll('.ball').length).toBeGreaterThan(0);
  });

  it('stays hidden for visitors who prefer reduced motion', async () => {
    mockReducedMotion(true);
    const { container } = render(<FootballRain />);
    await userEvent.keyboard(konami);
    expect(container).toBeEmptyDOMElement();
  });
});

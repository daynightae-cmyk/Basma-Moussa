import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrandThreadSplash } from "@/components/brand/BrandThreadSplash";
import { PortalLink } from "@/components/navigation/PortalLink";
import { PortalTransitionProvider } from "@/components/navigation/PortalTransition";

const navState = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: navState.push,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/ar",
}));

function setReducedMotion(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  navState.push.mockReset();
  vi.useRealTimers();
  setReducedMotion(false);
  window.history.replaceState(null, "", "/");
});

describe("portal door transition", () => {
  // jsdom cannot perform document navigation. Prevent the browser default
  // after React's handler has run, so portals can be tested without noise.
  const preventNavigation = (event: Event) => event.preventDefault();

  beforeEach(() => {
    window.addEventListener("click", preventNavigation);
  });

  afterEach(() => {
    window.removeEventListener("click", preventNavigation);
  });

  function renderPortal() {
    return render(
      <PortalTransitionProvider>
        <PortalLink href="/ar/programs/beyond-the-frame" title="خارج الإطار">
          <span data-portal-media>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/04-interview-studio.webp" alt="" />
          </span>
        </PortalLink>
      </PortalTransitionProvider>,
    );
  }

  it("shows the cinematic door, navigates to the real route and clears itself", async () => {
    renderPortal();
    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(navState.push).toHaveBeenCalledWith("/ar/programs/beyond-the-frame");
    const door = document.querySelector(".door--active");
    expect(door).not.toBeNull();
    expect(door?.querySelector(".door__label")?.textContent).toBe("خارج الإطار");
    expect(door?.querySelectorAll("img")).toHaveLength(2);
    expect(link).toHaveAttribute("href", "/ar/programs/beyond-the-frame");

    await waitFor(
      () => expect(document.querySelector(".door--active")).toBeNull(),
      { timeout: 2600 },
    );
  });

  it("lets Escape leave the doorway immediately", () => {
    renderPortal();
    fireEvent.click(screen.getByRole("link"));
    expect(document.querySelector(".door--active")).not.toBeNull();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.querySelector(".door--active")).toBeNull();
  });

  it("does not hijack modified clicks", () => {
    renderPortal();
    fireEvent.click(screen.getByRole("link"), { ctrlKey: true });
    expect(navState.push).not.toHaveBeenCalled();
    expect(document.querySelector(".door--active")).toBeNull();
  });

  it("keeps normal link navigation when reduced motion is requested", () => {
    setReducedMotion(true);
    renderPortal();
    fireEvent.click(screen.getByRole("link"));
    expect(navState.push).not.toHaveBeenCalled();
    expect(document.querySelector(".door--active")).toBeNull();
  });
});

describe("brand intro splash", () => {
  it("appears on a first visit, can be skipped, and remembers the session", () => {
    vi.useFakeTimers();
    const first = render(<BrandThreadSplash locale="en" />);
    const splash = screen.getByRole("region", {
      name: "Brand intro — Basma Moussa",
    });
    expect(splash).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Skip intro" }),
    ).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("intro-pending");

    fireEvent.click(screen.getByRole("button", { name: "Skip intro" }));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.queryByRole("region", { name: "Brand intro — Basma Moussa" }),
    ).toBeNull();
    expect(window.sessionStorage.getItem("bm-intro-v1")).toBe("1");

    first.unmount();
    render(<BrandThreadSplash locale="en" />);
    expect(
      screen.queryByRole("region", { name: "Brand intro — Basma Moussa" }),
    ).toBeNull();
  });

  it("dismisses itself after the approved duration", () => {
    vi.useFakeTimers();
    render(<BrandThreadSplash locale="ar" />);
    expect(
      screen.getByRole("region", { name: "مقدمة الهوية — بسمة موسى" }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2600);
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.queryByRole("region", { name: "مقدمة الهوية — بسمة موسى" }),
    ).toBeNull();
  });

  it("is skipped entirely when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<BrandThreadSplash locale="ar" />);
    expect(
      screen.queryByRole("region", { name: "مقدمة الهوية — بسمة موسى" }),
    ).toBeNull();
    expect(window.sessionStorage.getItem("bm-intro-v1")).toBe("1");
    expect(document.documentElement).not.toHaveClass("intro-pending");
  });

  it("replays on demand even after the session flag exists", () => {
    window.sessionStorage.setItem("bm-intro-v1", "1");
    window.history.replaceState(null, "", "/ar?replay=1");
    render(<BrandThreadSplash locale="ar" />);
    expect(
      screen.getByRole("region", { name: "مقدمة الهوية — بسمة موسى" }),
    ).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });
});

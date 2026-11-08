import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MediaExplorer, type ExplorerItem } from "@/components/media/MediaExplorer";
import { SoundroomConsole } from "@/components/media/SoundroomConsole";
import { PortalTransitionProvider } from "@/components/navigation/PortalTransition";
import { Header } from "@/components/navigation/Header";
import { getDictionary } from "@/lib/i18n/dictionary";

const navState = vi.hoisted(() => ({
  push: vi.fn(),
  pathname: "/en/media",
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: navState.push,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => navState.pathname,
}));

const blur = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAAUAmJQBOgCHwAP7/2Q==";

const items: ExplorerItem[] = [
  {
    id: "beyond-the-frame",
    href: "/en/programs/beyond-the-frame",
    title: "Beyond the Frame",
    kicker: "The Conversation Chamber",
    teaser: "Conversations that leave a mark.",
    category: "conversation",
    variant: "wide",
    image: {
      src: "/media/04-interview-studio.webp",
      alt: "Illustrative interview studio",
      width: 1280,
      height: 720,
      focalPoint: { x: 50, y: 50 },
      blurDataURL: blur,
    },
    searchText: "beyond the frame interview guest studio",
  },
  {
    id: "the-legal-lens",
    href: "/en/legal-lens",
    title: "The Legal Lens",
    kicker: "The Research Gallery",
    teaser: "Law is clearer when we read it together.",
    category: "legal",
    variant: "tall",
    image: {
      src: "/media/03-media-universe.webp",
      alt: "Illustrative legal library",
      width: 1280,
      height: 720,
      focalPoint: { x: 50, y: 50 },
      blurDataURL: blur,
    },
    searchText: "legal lens law awareness sources legislation",
  },
  {
    id: "city-voices",
    href: "/en/programs/city-voices",
    title: "City Voices",
    kicker: "The Waterfront",
    teaser: "A city is not its buildings.",
    category: "documentary",
    variant: "tall",
    image: {
      src: "/media/07-city-voices.webp",
      alt: "Illustrative Sharjah waterfront",
      width: 1280,
      height: 720,
      focalPoint: { x: 50, y: 50 },
      blurDataURL: blur,
    },
    searchText: "city voices sharjah uae waterfront documentary",
  },
  {
    id: "soundroom",
    href: "/en/soundroom",
    title: "Soundroom",
    kicker: "The Golden Frequency",
    teaser: "Listen for the layers you cannot see.",
    category: "audio",
    variant: "wide",
    image: {
      src: "/media/08-voice-identity.webp",
      alt: "Illustrative gold waveform",
      width: 1280,
      height: 720,
      focalPoint: { x: 50, y: 50 },
      blurDataURL: blur,
    },
    searchText: "soundroom podcast waveform audio listening",
  },
];

const labels = {
  searchLabel: "Search media worlds",
  searchPlaceholder: "Search by title or theme…",
  filterLabel: "Filter by kind",
  categories: {
    all: "All worlds",
    conversation: "Conversation",
    legal: "Legal",
    documentary: "Documentary",
    audio: "Audio",
  },
  resultsOne: "1 world",
  resultsMany: "{count} worlds",
  noResultsTitle: "No matching worlds",
  noResultsBody: "Try a broader word or reset the filters.",
  resetAction: "Show all worlds",
  listLabel: "Media world results",
  statusLabel: "Concept",
  ctaLabel: "Enter the world",
  illustrativeLabel: "Illustrative",
};

function renderExplorer() {
  return render(
    <PortalTransitionProvider>
      <MediaExplorer items={items} labels={labels} />
    </PortalTransitionProvider>,
  );
}

describe("MediaExplorer", () => {
  it("announces the full result count and renders a real link per world", () => {
    renderExplorer();
    expect(screen.getByText("4 worlds")).toHaveAttribute("aria-live", "polite");
    const list = screen.getByLabelText("Media world results");
    expect(within(list).getAllByRole("link")).toHaveLength(4);
    expect(
      within(list).getByRole("link", { name: /Beyond the Frame/ }).getAttribute("href"),
    ).toBe("/en/programs/beyond-the-frame");
  });

  it("filters by search text and reports a single world", async () => {
    const user = userEvent.setup();
    renderExplorer();
    await user.type(screen.getByRole("searchbox"), "legal");
    await waitFor(() => expect(screen.getByText("1 world")).toBeInTheDocument());
    const list = screen.getByLabelText("Media world results");
    expect(within(list).getAllByRole("link")).toHaveLength(1);
    expect(within(list).getByText("The Legal Lens")).toBeInTheDocument();
  });

  it("filters by category and keeps the pressed state truthful", async () => {
    const user = userEvent.setup();
    renderExplorer();
    await user.click(screen.getByRole("button", { name: "Documentary" }));
    expect(screen.getByRole("button", { name: "Documentary" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All worlds" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    const list = screen.getByLabelText("Media world results");
    expect(within(list).getAllByRole("link")).toHaveLength(1);
    expect(within(list).getByText("City Voices")).toBeInTheDocument();
  });

  it("shows a designed empty state with a working reset", async () => {
    const user = userEvent.setup();
    renderExplorer();
    await user.type(screen.getByRole("searchbox"), "zzzz");
    const empty = await screen.findByRole("status");
    expect(within(empty).getByText("No matching worlds")).toBeInTheDocument();
    expect(screen.getByText("0 worlds")).toBeInTheDocument();

    const resets = screen.getAllByRole("button", { name: "Show all worlds" });
    await user.click(resets[resets.length - 1]);
    expect(await screen.findByText("4 worlds")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: "All worlds" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("SoundroomConsole", () => {
  const dict = getDictionary("en");

  it("is a decorative waveform, not a hidden audio player", () => {
    const { container } = render(<SoundroomConsole dict={dict} />);
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.getByText("Decorative waveform — not audio")).toBeInTheDocument();
    expect(
      screen.getByText("This is a visual waveform only. No audio file is published yet."),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(".wave__bar")).toHaveLength(40);
  });

  it("pauses and resumes motion with a truthful pressed state", async () => {
    const user = userEvent.setup();
    const { container } = render(<SoundroomConsole dict={dict} />);
    const button = screen.getByRole("button", { name: "Pause decorative motion" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector(".wave")).not.toHaveClass("is-paused");

    await user.click(button);
    expect(
      screen.getByRole("button", { name: "Start decorative motion" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(container.querySelector(".wave")).toHaveClass("is-paused");

    await user.click(screen.getByRole("button", { name: "Start decorative motion" }));
    expect(
      screen.getByRole("button", { name: "Pause decorative motion" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Header", () => {
  it("marks the current section and preserves the locale on switch", () => {
    navState.pathname = "/en/media";
    render(<Header locale="en" />);
    const headerNav = screen.getAllByRole("navigation", {
      name: "Main navigation",
    })[0];
    expect(
      within(headerNav).getByRole("link", { name: "Media Universe" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(headerNav).getByRole("link", { name: "About" }),
    ).not.toHaveAttribute("aria-current");

    const switcher = screen.getByRole("link", { name: /Switch to Arabic/ });
    expect(switcher).toHaveAttribute("href", "/ar/media");
    expect(switcher).toHaveAttribute("lang", "ar");
    expect(switcher).toHaveAttribute("hrefLang", "ar");
  });

  it("opens the mobile menu, traps initial focus and closes on Escape", async () => {
    navState.pathname = "/en/about";
    const user = userEvent.setup();
    render(<Header locale="en" />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    const panel = screen.getByLabelText("Menu");
    expect(panel).toHaveAttribute("hidden");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    const firstLink = within(panel).getAllByRole("link")[0];
    await waitFor(() => expect(document.activeElement).toBe(firstLink));

    fireEvent.keyDown(window, { key: "Escape" });
    expect(panel).toHaveAttribute("hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(toggle);
    expect(document.body.style.overflow).toBe("");
  });
});

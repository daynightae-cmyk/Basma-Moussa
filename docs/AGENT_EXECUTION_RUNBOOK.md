# DeepSeek / Multi-Agent Execution Runbook
**Repository:** https://github.com/daynightae-cmyk/Basma-Moussa
**Preferred local folder (when available):** D:\Basma-Moussa
**Mission:** implement DEEPSEEK_PRODUCTION_MISSION.md continuously, one verified vertical slice at a time.

## 1. Do not assume paths or tools
Discovery before action:
- Check current workspace/repository Git root, then D:\Basma-Moussa if Windows drive D exists.
- Inspect repo metadata and local copy independently; don't assume they are equal.
- Read git status, HEAD, origin/main, branches, worktrees, PRs, stash, untracked and currently active agent changes.
- Read project README and docs. Use supplied media under public/ if present; reference originals in D:\Basma-Moussa-Source-Assets only when that private local folder exists.
- Ignore irrelevant parallel agent work in other repositories/disks; do not stop their processes.
- If target local path does not exist, but GitHub accessible, clone into a safe unoccupied folder of your choice; don't overwrite existing directories.
- If only local exists, do useful work and commit without falsely claiming a push.
- If only GitHub exists, work in cloud Git runtime / connector or create an isolated repo branch and implement there. If you cannot execute tests, record it.

## 2. Matrix of operating modes
| Local | GitHub | Safe behavior | Truthful status |
|---|---|---|---|
| yes | yes | Compare commits/dirty work, use safe branch, implement, run tests, PR/merge verified slices | Local SHA / pushed SHA / merged SHA separately |
| yes | no | Implement and test locally, commit locally, track pending push | LOCAL ONLY, NOT PUSHED |
| no | yes | Clone safely or use cloud repo/connector; implement, run CI/browser if available | REMOTE ONLY, indicate runtime gaps |
| no | no | Implement in authorized workspace if any; don't claim Git integration | BLOCKED ACCESS, provide precise remaining steps |

Use scripts/inspect-workspace.ps1 for a safe Windows preflight when local shell is available. It never resets or deletes Git state.

## 3. Sequential integration policy — one deliverable at a time
For each task T00–T16 in the master prompt:
1. Read latest main HEAD, active branches and other agents. Identify overlap.
2. Implement a *complete small vertical slice*, not dozens of placeholders.
3. Run appropriate tests and compare actual screenshots against approved visual identity (especially Splash/World Portals).
4. Document change, evidence, result and limitations. Commit with a scoped message.
5. If remote/CI available and no conflict, push branch, open PR, await/review relevant checks, merge into main safely, verify actual merge SHA. The owner authorizes sequential integration subject to real quality gates; do not bypass failing checks merely to satisfy pace.
6. If merge not safe/possible, preserve unique branch; mark NOT MERGED and continue with independent work from an accurate baseline.
7. Never delete branches/worktrees, overwrite uncommitted assets, reset --hard, clean untracked, force-push, or rewrite shared Git history.

Main is a trustworthy integrated product baseline, not a warehouse of every unfinished experiment. Keep unmerged unique work safe and discoverable. A branch being behind main does not imply it's worthless.

## 4. Core product QA per slice
T02 brand: exact supplied gold/nv logo & responsive crops.
T03 splash: golden threads animate to actual logo; skip; reduced motion; replay; startup fallback.
T05 worlds: a card opens an actual new route like a door; browser back, link, focus and mobile work.
T08 soundroom: true media availability and player state; decorative motion labelled.
T09 legal: official source links, jurisdiction and review status; no unauthorized legal claims.
T10 city: real UAE context, image provenance, no fake interview.
T13 contact: approved WhatsApp works; backend form only with real delivery.
T15 gates: AR/EN 360/390/768/1024/1440/1920, dark UI, screenshots, audit, lint/typecheck/build/test/E2E, runtime errors and performance budgets.

No claim of "pass" without actual command/output. Build success does NOT establish visual/runtime accuracy.

## 5. Git workflow example (PowerShell, adapt as needed)
~~~powershell
# Read-only baseline audit first:
git status -sb
git rev-parse HEAD
git remote -v
git branch -avv
git worktree list --porcelain
git stash list

# Then use a focused task branch, only if baseline is safe:
git switch -c feat/basma-t03-golden-splash

# Implement + run suitable verification, inspect diff and status.
git diff --check
git status -sb
git add <intentionally-changed-paths>
git commit -m "feat: implement verified golden-thread splash"

# ONLY when access is configured and branch is conflict-free:
git push -u origin feat/basma-t03-golden-splash
# Open PR, inspect CI, merge when approved/safe; verify origin/main afterward.
~~~

Do not blindly copy commands with angle-bracket placeholders; substitute real paths explicitly. If local main has dirty work, use a separate worktree/branch or preserve and coordinate; never reset or lose it.

## 6. Image architecture note
Fourteen supplied sources were downloaded and inspected, not merely suggested. They have real mapped WebP derivatives under public/media and the original circular logo under public/brand. Consult docs/PRODUCTION_ASSET_MAP.md; do not hotlink external Postimg when local assets are present. No need to regenerate them. Distinguish illustrative scenes from documented real-world events. Portrait identity must be approved.

## 7. Handoff report template
- BASELINE: repo path, local/remote mode, HEAD and origin/main SHAs, active agents, cleanliness.
- RISKS/UNIQUE WORK: preserved work/branches, possible conflicts, outside secrets.
- DELIVERED: files/routes/UI and real behavior; content provenance.
- TEST EVIDENCE: commands/outputs, browser paths and screenshots, failures.
- GIT: local SHA, pushed SHA, PR URL, merge SHA, main SHA, remaining unmerged work.
- DEPLOYMENT: real URL+smoke revision or NOT DEPLOYED.
- GAPS and NEXT SAFE ACTION.

Do not conclude a long mission with only planning; complete what can be executed, then accurately report where tool/access limits remain.

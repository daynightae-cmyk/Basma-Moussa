/**
 * Experience-layer re-export of the shared motion policy.
 * Prefer importing from here inside cinematic/media modules so the
 * experience boundary stays stable if the underlying policy file moves.
 */
export {
  resolveMotionPolicy,
  SCENE_READING_MS,
  type MotionPolicy,
  type MotionPolicyInput,
} from "@/lib/motion/policy";

export {
  getMotionPolicy,
  resetMotionPolicyCache,
} from "@/lib/motion/device-motion-policy";

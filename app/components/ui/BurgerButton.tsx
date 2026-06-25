import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { useNavDrawer } from "@/app/lib/stores/useNavDrawer";
import { motion } from "framer-motion";

export function BurgerButton() {
  const { item, barSpring, reduce } = useMotionPresets();
  const open = useNavDrawer((s) => s.open);
  const toggleDrawer = useNavDrawer((s) => s.toggleDrawer);

  return (
    <motion.button
      variants={item}
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-nav-drawer"
      onClick={toggleDrawer}
      whileTap={reduce ? undefined : { scale: 0.92 }}
      className="group -ml-2 inline-flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent sm:ml-0"
    >
      <span aria-hidden="true" className="relative block h-4 w-6">
        {/* top bar — rotates to one diagonal of the X */}
        <motion.span
          animate={
            open
              ? { y: 7, rotate: 45, width: 24 }
              : { y: 0, rotate: 0, width: 24 }
          }
          transition={barSpring}
          className="absolute left-0 top-0 h-0.5 origin-center bg-bone transition-colors duration-300 group-hover:bg-accent"
        />
        {/* middle bar — short hand-cut detail; fades out */}
        <motion.span
          animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: 16 }}
          transition={barSpring}
          className="absolute left-0 top-1.75 h-0.5 bg-bone transition-colors duration-300 group-hover:bg-accent"
        />
        {/* bottom bar — rotates to the other diagonal */}
        <motion.span
          animate={
            open
              ? { y: -7, rotate: -45, width: 24 }
              : { y: 0, rotate: 0, width: 20 }
          }
          transition={barSpring}
          className="absolute left-0 bottom-0 h-0.5 origin-center bg-bone transition-colors duration-300 group-hover:bg-accent"
        />
      </span>
    </motion.button>
  );
}

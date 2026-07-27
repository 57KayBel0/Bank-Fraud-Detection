import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        ${color}
        p-6
        shadow-xl
        text-white
      `}
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />

      <div className="relative flex justify-between">

        <div>

          <p className="uppercase tracking-wide text-sm opacity-80">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

          <p className="mt-4 opacity-80">
            {subtitle}
          </p>

        </div>

        <div className="
            w-16
            h-16
            rounded-2xl
            bg-white/20
            backdrop-blur-lg
            flex
            items-center
            justify-center
            text-3xl
        ">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}
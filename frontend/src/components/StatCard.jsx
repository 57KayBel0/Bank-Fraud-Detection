import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        flex
        justify-between
        items-center
      "
    >
      <div>

        <p className="text-gray-500 text-sm">

          {title}

        </p>

        <h2 className="text-3xl font-bold mt-2">

          {value}

        </h2>

      </div>

      <div
        className={`
          w-14
          h-14
          rounded-xl
          flex
          items-center
          justify-center
          text-white
          text-2xl
          ${color}
        `}
      >
        {icon}
      </div>
    </motion.div>
  );
}
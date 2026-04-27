import React from "react";
import { motion } from "framer-motion";

export const FormattedMessage = ({ elements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {elements.map((element, idx) => {
        switch (element.type) {
          case "heading":
            if (element.level === 1) {
              return (
                <h3
                  key={idx}
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-4"
                >
                  {element.content}
                </h3>
              );
            } else {
              return (
                <h4
                  key={idx}
                  className="text-lg font-semibold text-indigo-300 mt-3"
                >
                  {element.content}
                </h4>
              );
            }

          case "bullet":
            return (
              <div key={idx} className="flex gap-3 ml-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <p className="text-white/90">{element.content}</p>
              </div>
            );

          case "numbered":
            return (
              <div key={idx} className="flex gap-3 ml-2">
                <span className="text-indigo-400 font-bold min-w-fit">
                  {idx + 1}.
                </span>
                <p className="text-white/90">{element.content}</p>
              </div>
            );

          case "paragraph":
            return element.content ? (
              <p key={idx} className="text-white/90 leading-relaxed">
                {element.content}
              </p>
            ) : (
              <div key={idx} className="h-2" />
            );

          default:
            return null;
        }
      })}
    </motion.div>
  );
};

import React from "react";
import { motion } from "framer-motion";

export const ScriptDisplay = ({ content }) => {
  const { title, characters, scene, dialogues } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-6 rounded-lg border border-purple-500/20"
    >
      {/* Title */}
      {title && (
        <div className="border-b border-purple-500/30 pb-4">
          <h3 className="text-2xl font-bold text-purple-300">{title}</h3>
        </div>
      )}

      {/* Characters */}
      {characters && characters.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">
            Characters
          </h4>
          <div className="flex flex-wrap gap-2">
            {characters.map((char, idx) => (
              <span
                key={idx}
                className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-500/30"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Scene */}
      {scene && (
        <div>
          <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">
            Scene
          </h4>
          <p className="text-white/80 leading-relaxed italic">{scene}</p>
        </div>
      )}

      {/* Dialogues */}
      {dialogues && dialogues.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">
            Dialogues
          </h4>
          <div className="space-y-3">
            {dialogues.map((dialogue, idx) => (
              <p key={idx} className="text-white/80 leading-relaxed pl-4 border-l-2 border-indigo-500/50">
                {dialogue}
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

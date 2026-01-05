"use client";

import { Calculator, AlertTriangle, HelpCircle, Target } from "lucide-react";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinancialRatio } from "@/types";

interface RatioEducationModalProps {
  ratio: FinancialRatio | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RatioEducationModal({
  ratio,
  isOpen,
  onClose,
}: RatioEducationModalProps) {
  if (!ratio) return null;

  const edu = ratio.education;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ratio.fullName}
      description={`Understanding ${ratio.name} and what it tells you about a company`}
      size="large"
    >
      <div className="space-y-6">
        {/* Current value context */}
        <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
                Current Value
              </span>
              <div className="text-2xl font-bold text-[var(--color-deep-navy)]">
                {ratio.formatted}
              </div>
            </div>
            <Badge
              variant={
                ratio.interpretation === "excellent" || ratio.interpretation === "good"
                  ? "success"
                  : ratio.interpretation === "concerning" || ratio.interpretation === "red-flag"
                  ? "error"
                  : "default"
              }
              size="lg"
            >
              {ratio.interpretationLabel}
            </Badge>
          </div>
        </div>

        {/* What it means */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-[var(--color-deep-navy)]">
            <HelpCircle className="h-5 w-5 text-[var(--color-muted-teal)]" />
            What This Means
          </h4>
          <p className="mt-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
            {edu.whatItMeans}
          </p>
        </div>

        {/* How calculated */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-[var(--color-deep-navy)]">
            <Calculator className="h-5 w-5 text-[var(--color-muted-teal)]" />
            How It&apos;s Calculated
          </h4>
          <div className="mt-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] font-mono text-[var(--text-body-sm)]">
            {edu.howCalculated}
          </div>
        </div>

        {/* Good range */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-[var(--color-deep-navy)]">
            <Target className="h-5 w-5 text-[var(--color-success)]" />
            What&apos;s Considered Good
          </h4>
          <div className="mt-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-success-light)]">
            <span className="font-semibold text-[var(--color-success)]">
              {edu.goodRange.min} - {edu.goodRange.max}
            </span>
            <span className="ml-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
              {edu.goodRange.label}
            </span>
          </div>
        </div>

        {/* What affects it */}
        <div>
          <h4 className="font-semibold text-[var(--color-deep-navy)]">
            What Affects This Ratio
          </h4>
          <ul className="mt-2 space-y-1">
            {edu.whatAffectsIt.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-teal)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Red flags */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-[var(--color-deep-navy)]">
            <AlertTriangle className="h-5 w-5 text-[var(--color-error)]" />
            Warning Signs
          </h4>
          <ul className="mt-2 space-y-1">
            {edu.badSigns.map((sign, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-[var(--text-body-sm)] text-[var(--color-error)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-error)]" />
                {sign}
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations */}
        <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-light)]">
          <h4 className="font-semibold text-[var(--color-deep-navy)]">
            Limitations to Keep in Mind
          </h4>
          <ul className="mt-2 space-y-1">
            {edu.limitations.map((limitation, i) => (
              <li
                key={i}
                className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)]"
              >
                • {limitation}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Got it
        </Button>
      </ModalFooter>
    </Modal>
  );
}

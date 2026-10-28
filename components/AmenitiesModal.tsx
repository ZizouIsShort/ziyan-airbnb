"use client";

import { Icon } from "./Icon";
import type { IconName } from "@/lib/icons";
import { amenityGroups } from "@/lib/data";

const amenityIcon: Record<string, IconName> = {
  Hairdryer: "hairdryer",
  "Cleaning products": "cleaning",
  Shampoo: "shampoo",
  "Hot water": "hotWater",
  "Shower gel": "showerGel",
  "Washing machine": "washer",
  Hangers: "hangers",
  "Bed linen": "bedLinen",
  "Room-darkening blinds": "blinds",
  Iron: "iron",
  "Clothes storage": "storage",
  Cot: "cot",
  TV: "tv",
  "Air conditioning": "airConditioning",
  "Ceiling fan": "cool",
  "Exterior security cameras on property": "camera",
  "Carbon monoxide alarm": "coAlarm",
  "Smoke alarm": "smokeAlarm",
  Wifi: "wifi",
  "Dedicated workspace": "workspace",
  Kitchen: "kitchen",
  Fridge: "fridge",
  Freezer: "fridge",
  Microwave: "microwave",
  "Cooking basics": "kitchen",
  "Crockery and cutlery": "crockery",
  Kettle: "kettle",
  Coffee: "coffee",
  "Wine glasses": "wine",
  Toaster: "toaster",
  Blender: "blender",
  Cooker: "cooker",
  "Private entrance": "entrance",
  "Patio or balcony": "patio",
  "Outdoor dining area": "outdoorDining",
  "Free parking on premises": "parking",
  Pool: "pool",
  "Hot tub": "hotTub",
  Gym: "gym",
  "Pets allowed": "pets",
  "Cleaning available during stay": "cleaning",
  "Long-term stays allowed": "longTerm",
  "Self check-in": "checkin",
};

type AmenitiesModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AmenitiesModal({ open, onClose }: AmenitiesModalProps) {
  return (
    <div
      className={`amen-backdrop ${open ? "is-open" : ""}`}
      id="amenModal"
      aria-hidden={!open}
    >
      <div
        className="amen-modal"
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
      >
        <div className="amen-header">
          <button
            className="icon-button amen-close"
            type="button"
            aria-label="Close"
            id="amenClose"
            onClick={onClose}
            data-autofocus
          >
            <span>
              <Icon name="close" />
            </span>
          </button>
        </div>
        <div className="amen-body" id="amenBody">
          <h2>What this place offers</h2>
          {amenityGroups.map((group) => (
            <div className="amen-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => (
                <div className="amen-item" key={`${group.title}-${item}`}>
                  <span className="ico">
                    <Icon name={amenityIcon[item] ?? "checkin"} />
                  </span>
                  <span className="label">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

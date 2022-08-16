import { Template } from "@/domain/entities/template";
import { Unit } from "@/domain/value-objects/size";

import { Shape } from "./shape";

const DEFAULT_UNIT: Unit = "px";

type Templates = { [K in Shape]: Template };

export const Templates: Templates = {
  instagram_stories: Template.new({
    shape: "instagram_stories",
    size: {
      width: 1080,
      height: 1920,
      unit: DEFAULT_UNIT,
    },
  }),
  instagram_timeline: Template.new({
    shape: "instagram_timeline",
    size: {
      width: 1080,
      height: 1350,
      unit: DEFAULT_UNIT,
    },
  }),
  twitter_timeline: Template.new({
    shape: "twitter_timeline",
    size: {
      width: 1200,
      height: 675,
      unit: DEFAULT_UNIT,
    },
  }),
  pinterest_post: Template.new({
    shape: "pinterest_post",
    size: {
      width: 800,
      height: 1200,
      unit: DEFAULT_UNIT,
    },
  }),
  linkedin_post: Template.new({
    shape: "linkedin_post",
    size: {
      width: 1200,
      height: 628,
      unit: DEFAULT_UNIT,
    },
  }),
  whatsapp_story: Template.new({
    shape: "whatsapp_story",
    size: {
      width: 750,
      height: 1334,
      unit: DEFAULT_UNIT,
    },
  }),
  whatsapp_post: Template.new({
    shape: "whatsapp_post",
    size: {
      width: 800,
      height: 800,
      unit: DEFAULT_UNIT,
    },
  }),
};

/* instagram_timeline = 1080 x 1350
instagram_stories = 1080 x 1920
twitter_timeline = 1200 x 675
pinterest_post = 800 x 1200
linkedin_post = 1200 x 628
whatsapp_story = 750 x 1334
whatsapp_post = 800 x 800
custom_size */

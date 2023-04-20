import {backgroundColor, borderColor, borders, classnames, cursor, flex, flexBox, layout, padding, sizing, space, spacing, textColor, typography} from 'tailwindcss-classnames';

export const theme = classnames(
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-300'),
  borders('border-stone-500')
);

export const themeActive = classnames(
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-200'),
  borders('border-stone-500')
);

export const themeButton = classnames(
  theme,
  layout('flex'),
  flexBox('justify-center','items-center'),
  cursor('cursor-pointer'),
  backgroundColor('hover:bg-stone-200'),
)

export const themeButtonActive = classnames(
  themeActive,
  layout('flex'),
  flexBox('justify-center','items-center'),
  cursor('cursor-pointer'),
  backgroundColor('hover:bg-stone-200'),
)


export const navButton = classnames(
  typography('text-stone-500','tracking-widest'),
  borders('border-stone-500'),
  layout('flex'),
  spacing('pt-5'),
  flexBox('justify-between','items-center','flex-col'),
  cursor('cursor-pointer'),
  backgroundColor('hover:bg-stone-200'),
)

export const noteCard = classnames(
  layout('flex'),
  flexBox('flex-col','justify-between'),
  sizing('h-52'),
  padding('p-2'),
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-200'),
  borders('border','border-stone-500','rounded-3xl'),
); 

export const limeCard = classnames(
  noteCard,backgroundColor('hover:bg-lime-100')
); 

export const amberCard = classnames(
  noteCard,backgroundColor('hover:bg-amber-100')
); 

export const violetCard = classnames(
  noteCard,backgroundColor('hover:bg-violet-100')
); 

export const whiteCard = classnames(
  noteCard,backgroundColor('hover:bg-stone-100')
); 
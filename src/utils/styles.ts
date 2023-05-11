import { backgroundColor, borders, classnames, cursor, flexBox, layout, padding, sizing, spacing, textDecoration, textDecorationStyle, textDecorationThickness, textUnderlineOffset, typography } from 'tailwindcss-classnames';

export const theme = classnames(
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-300'),
  borders('border-stone-500')
);

export const themeButtonNoBg = classnames(
  typography('text-stone-500','tracking-widest'),
  borders('border-stone-500'),
  layout('flex'),
  flexBox('justify-center','items-center'),
  cursor('cursor-pointer'),
  backgroundColor('hover:bg-stone-200'),
)

export const themeButton = classnames(
  themeButtonNoBg,
  backgroundColor('bg-stone-300'),
)

export const themeFlex = classnames(
  typography('text-stone-500','tracking-widest'),
  borders('border-stone-500'),
  layout('flex'),
  flexBox('justify-center','items-center'),
)

export const themeActive = classnames(
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-200'),
  borders('border-stone-500')
);

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

export const navButtonSmall = classnames(
  borders('border-stone-500'),
  layout('flex'),
  flexBox('justify-center','items-center'),
  cursor('cursor-pointer'),
)

export const noteCard = classnames(
  layout('flex'),
  flexBox('flex-col','justify-between'),
  sizing('h-52'),
  padding('p-2'),
  typography('text-stone-500','tracking-widest'),
  backgroundColor('bg-stone-200'),
  borders('rounded-3xl'),
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

export const underline = classnames(
  textDecoration('underline'),
  textUnderlineOffset('underline-offset-4','lg:underline-offset-2'),
  textDecorationStyle('decoration-wavy'),
  textDecorationThickness('decoration-4','lg:decoration-2')
);
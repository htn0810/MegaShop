import { t } from 'i18next'
import { z } from 'zod'

export const formAddEditProductSchema = z.object({
  name: z.string().min(1, { message: t('login.err_input_need_filled') }),
  images: z
    .array(z.string())
    .min(1, { message: t('login.err_input_need_filled') })
    .max(5, { message: 'Maximum 5 images allowed' }),
  category: z.string(),
  description: z.string().min(1, { message: t('login.err_input_need_filled') }),
  attributes: z.array(
    z.object({
      name: z.string().min(1, { message: t('login.err_input_need_filled') }),
      values: z.array(z.string().min(1, { message: t('login.err_input_need_filled') })),
    }),
  ),
})

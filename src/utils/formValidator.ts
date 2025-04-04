import { t } from 'i18next'
import { z } from 'zod'

export const formAddEditProductSchema = z.object({
  name: z.string().min(1, { message: t('login.err_input_need_filled') }),
  categoryId: z.number().min(1, { message: t('login.err_input_need_filled') }),
  description: z.string().min(1, { message: t('login.err_input_need_filled') }),
  price: z.number().min(1, { message: t('login.err_input_need_filled') }),
  stock: z.number().min(1, { message: t('login.err_input_need_filled') }),
  slug: z.string().min(1, { message: t('login.err_input_need_filled') }),
})

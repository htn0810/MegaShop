import { Input } from '@/components/ui/input'
import { t } from 'i18next'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type VariantCombination = {
  id: string
  combinations: Record<string, string> // { size: 'S', color: 'Red' }
  price: number
  stock: number
  saleOff: number
}

const formSchema = z.object({
  name: z.string().min(1, { message: t('login.err_input_need_filled') }),
  category: z.string(),
  description: z.string().min(1, { message: t('login.err_input_need_filled') }),
  attributes: z.array(
    z.object({
      name: z.string().min(1, { message: t('login.err_input_need_filled') }),
      values: z.array(z.string().min(1, { message: t('login.err_input_need_filled') })),
    }),
  ),
})

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>
  variantCombinations: VariantCombination[]
  setVariantCombinations: React.Dispatch<React.SetStateAction<VariantCombination[]>>
}

const VariationInfo = (props: Props) => {
  const { form, variantCombinations, setVariantCombinations } = props

  // Hàm để tạo tất cả các combination có thể có từ các variants
  const generateCombinations = () => {
    const attributesData = form.watch('attributes') || []
    if (!attributesData.length) return

    const combinations: VariantCombination[] = []

    // Tạo mảng các options cho mỗi attribute
    const optionsArray = attributesData.map((attr) => ({
      name: attr.name,
      values: attr.values,
    }))

    // Hàm đệ quy để tạo tất cả các combinations
    const generateHelper = (current: Record<string, string>, depth: number) => {
      if (depth === optionsArray.length) {
        combinations.push({
          id: Object.values(current).join('-'),
          combinations: { ...current },
          price: 0,
          stock: 0,
          saleOff: 0,
        })
        return
      }

      const currentAttribute = optionsArray[depth]
      currentAttribute.values.forEach((value) => {
        generateHelper({ ...current, [currentAttribute.name]: value }, depth + 1)
      })
    }

    generateHelper({}, 0)
    setVariantCombinations(combinations)
  }

  // Thêm useEffect để tự động tạo combinations khi attributes thay đổi
  useEffect(() => {
    generateCombinations()
  }, [form.watch('attributes')])
  return (
    <>
      {/* Thêm bảng variants sau phần attributes */}
      {variantCombinations.length > 0 && (
        <div className='border rounded-md mt-4'>
          <div className='grid grid-cols-12 gap-2 p-4 bg-gray-50 font-medium border-b'>
            {/* Headers */}
            {Object.keys(variantCombinations[0].combinations).map((key) => (
              <div key={key} className='col-span-2'>
                {key}
              </div>
            ))}
            <div className='col-span-2'>Price</div>
            <div className='col-span-2'>Stock</div>
            <div className='col-span-2'>Sale Off (%)</div>
          </div>

          {/* Rows */}
          {variantCombinations.map((combination, index) => (
            <div key={combination.id} className='grid grid-cols-12 gap-2 p-4 border-b last:border-b-0'>
              {/* Variant values */}
              {Object.values(combination.combinations).map((value) => (
                <div key={value} className='col-span-2'>
                  {value}
                </div>
              ))}

              {/* Price input */}
              <div className='col-span-2'>
                <Input
                  type='number'
                  value={combination.price}
                  onChange={(e) => {
                    const newCombinations = [...variantCombinations]
                    newCombinations[index].price = Number(e.target.value)
                    setVariantCombinations(newCombinations)
                  }}
                  className='w-full'
                />
              </div>

              {/* Stock input */}
              <div className='col-span-2'>
                <Input
                  type='number'
                  value={combination.stock}
                  onChange={(e) => {
                    const newCombinations = [...variantCombinations]
                    newCombinations[index].stock = Number(e.target.value)
                    setVariantCombinations(newCombinations)
                  }}
                  className='w-full'
                />
              </div>

              {/* Sale off input */}
              <div className='col-span-2'>
                <Input
                  type='number'
                  value={combination.saleOff}
                  onChange={(e) => {
                    const newCombinations = [...variantCombinations]
                    newCombinations[index].saleOff = Number(e.target.value)
                    setVariantCombinations(newCombinations)
                  }}
                  className='w-full'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default VariationInfo

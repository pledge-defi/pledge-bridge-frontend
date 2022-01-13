/* Create Time: 2021/10/22 */
module.exports = {
  /* 初始化csrf */
  'GET /init/fast/pay': {
    CsrfToken: '@word',
    IdentityCode: '@word',
    ShopName: '@word',
  },
  /* 获取收货国家 */
  'GET /fast/pay/get_all_country': {
    'countries|10-20': [
      {
        name: '@last',
        code: '@guid',
        ContinentName: '@word',
        ContinentCode: '@word',
      },
    ],
  },
  /* 获取省 */
  'GET /fast/pay/get_all_province': {
    'provinces|10-20': [
      {
        name: '@last',
        countryCode: '@word',
        code: '@guid',
      },
    ],
  },
  /* 获取邮费列表 */
  'GET /fast/pay/get_shipping_zones': {
    shipping_zones: [
      {
        id: 145706877091,
        name: 'All of World',
        profile_id: 'gid://shopify/DeliveryProfile/61025616035',
        location_group_id: 'gid://shopify/DeliveryLocationGroup/61618520227',
        countries: [
          {
            id: 324928700579,
            shipping_zone_id: 145706877091,
            name: 'Aland Islands',
            tax: '0',
            code: 'AX',
            tax_name: 'VAT',
            provinces: [
              {
                id: 2491443904602,
                Code: 'AL',
                country_id: 228884545626,
                shipping_zone_id: 92809953370,
                name: 'Alabama',
                tax: '0',
                tax_name: 'State Tax',
                tax_type: '',
                tax_percentage: '0',
              },
            ],
          },
          {
            id: 324928798883,
            shipping_zone_id: 145706877091,
            name: 'Armenia',
            tax: '0',
            code: 'AM',
            tax_name: 'VAT',
            provinces: [],
          },
        ],
        provinces: null,
        price_based_shipping_rates: [
          {
            id: 255970640035,
            name: 'Standard',
            price: '5.68',
            shipping_zone_id: 145706877091,
          },
          {
            id: 256451379363,
            name: 'Free shipping',
            price: '0',
            shipping_zone_id: 145706877091,
          },
        ],
        weight_based_shipping_rates: [],
      },
    ],
  },
  /* 创建临时订单[创建订单/保存shippingAddress/返回支付方式列表] */
  'POST /fast/pay/create_draft_order': {
    token: '@word',
    sid: '@guid',
    'payMethodList|10-20': [
      {
        payMethod: '@word',
        payGateWay: '@word',
        publicKey: '@word',
        'instalments|10-20': [
          {
            periodNumber: '@integer(0, 3)',
            customerInterestRate: '@integer(0, 3)',
            periodAmount: '@integer(0, 3)',
            totalAmount: '@integer(0, 3)',
            currency: '@word',
            interest: '@integer(0, 3)',
          },
        ],
        'bindCards|10-20': [
          {
            cardNumber: '@word',
            clientIdentity: '@word',
            payMethod: '@word',
            brand: '@word',
          },
        ],
      },
    ],
  },
  /* 更新临时订单 */
  'POST /fast/pay/update_draft_order': {
    result: '@word',
  },
  /* Deal下单 */
  'POST /fast/pay/checkout_deal': {
    action: '@word',
    can_click_back: '@boolean',
    client_data: '@word',
    currency: '@word',
    totalPrice: '@word',
    url: '@word',
    urlType: '@word',
  },
};

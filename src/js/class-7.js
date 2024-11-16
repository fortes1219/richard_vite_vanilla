const StorageCheck = {
  // 取得所有 localStorage 項目的詳細資訊
  getLocalStorageItems() {
    try {
      const items = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (key && value) {
          // 確保 key 和 value 都存在
          const size = ((key.length || 0) + (value.length || 0)) / 1024;
          items.push({
            key,
            size: `${size.toFixed(2)} KB`,
            value: value.substring(0, 50) + (value.length > 50 ? '...' : ''),
          });
        }
      }
      return items;
    } catch (e) {
      console.error('Error in getLocalStorageItems:', e);
      return [];
    }
  },

  // 取得所有 cookies 的詳細資訊
  getCookieItems() {
    try {
      if (!document.cookie) return [];

      const cookies = document.cookie.split(';');
      return cookies
        .map((cookie) => {
          const [key = '', value = ''] = cookie.trim().split('=');
          const size = ((key.length || 0) + (value.length || 0)) / 1024;

          return {
            key: key.trim(),
            size: `${size.toFixed(2)} KB`,
            value: value.substring(0, 50) + (value.length > 50 ? '...' : ''),
          };
        })
        .filter((item) => item.key); // 只返回有效的項目
    } catch (e) {
      console.error('Error in getCookieItems:', e);
      return [];
    }
  },

  // 計算 localStorage 大小
  checkLocalStorageSize() {
    try {
      let size = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const value = localStorage.getItem(key);
          size += (key.length || 0) + (value?.length || 0);
        }
      }
      const sizeInKB = (size / 1024).toFixed(2);
      return {
        used: Number(sizeInKB),
        remaining: 5120 - Number(sizeInKB), // 假設上限是 5MB
        total: size,
      };
    } catch (e) {
      console.error('Error in checkLocalStorageSize:', e);
      return { used: 0, remaining: 5120, total: 0 };
    }
  },

  // 計算 Cookies 大小
  checkCookieSize() {
    try {
      const cookieSize = document.cookie ? document.cookie.length : 0;
      const sizeInKB = (cookieSize / 1024).toFixed(2);
      return {
        used: Number(sizeInKB),
        remaining: 4 - Number(sizeInKB), // 4KB 限制
        total: cookieSize,
      };
    } catch (e) {
      console.error('Error in checkCookieSize:', e);
      return { used: 0, remaining: 4, total: 0 };
    }
  },

  // 顯示完整報告
  generateReport() {
    console.group('Storage Usage Report');

    // localStorage 報告
    console.group('localStorage');
    const localStorageItems = this.getLocalStorageItems();
    if (localStorageItems.length > 0) {
      console.table(localStorageItems);
    } else {
      console.log('No localStorage items found');
    }
    const lsSize = this.checkLocalStorageSize();
    console.log(`Used: ${lsSize.used} KB`);
    console.log(`Remaining: ${lsSize.remaining} KB`);
    console.groupEnd();

    // Cookies 報告
    console.group('Cookies');
    const cookieItems = this.getCookieItems();
    if (cookieItems.length > 0) {
      console.table(cookieItems);
    } else {
      console.log('No cookies found');
    }
    const cookieSize = this.checkCookieSize();
    console.log(`Used: ${cookieSize.used} KB`);
    console.log(`Remaining: ${cookieSize.remaining} KB`);
    console.groupEnd();

    console.groupEnd();
  },
};

// 使用範例
try {
  StorageCheck.generateReport();
} catch (e) {
  console.error('Error generating report:', e);
}

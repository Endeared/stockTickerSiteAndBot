from asyncio import tasks
import discord
from dotenv import load_dotenv
import requests
import json
from bs4 import BeautifulSoup
import asyncio
import ctypes
from discord.ext import commands
from discord.utils import get



ctypes.windll.kernel32.SetConsoleTitleW("StockTicker")


intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)


@bot.command(name='t')
async def info(ctx, stock):
    upper = stock.upper()
    symb = upper
    headers = {
        "accept": "application/json"
    }
    api_url = f'https://api.polygon.io/v2/aggs/ticker/{symb}/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=zuwnlARh8tmPmFfs_1JhhFI8ukuB8Cpi'
    api_url2 = f'https://api.polygon.io/v3/reference/tickers/{symb}?apiKey=zuwnlARh8tmPmFfs_1JhhFI8ukuB8Cpi'
    response = requests.get(api_url, headers=headers)
    response2 = requests.get(api_url2, headers=headers)
    data = response.json()
    data2 = response2.json()

    ticker = data['ticker']
    open = data['results'][0]['o']
    high = data['results'][0]['h']
    low = data['results'][0]['l']
    close = data['results'][0]['c']
    name = data2['results']['name']
    locale = (data2['results']['locale']).upper()
    currency = (data2['results']['currency_name']).upper();
    description = data2['results']['description']


    # await ctx.send(f'{ticker}, {open}, {high}, {low}, {close}, {name}, {locale}, {currency}, {description}')

    embed = discord.Embed(title=f'{ticker} - {name}',
                        description=f'{description}',
                        color=0x3372a3)

    embed.set_author(name="StockTicker")

    embed.add_field(name="Background",
                    value=f'Locale / Currency: {locale} / {currency}',
                    inline=False)

    embed.add_field(name="Open",
                    value=f'{open}',
                    inline=True)

    embed.add_field(name="High",
                    value=f'{high}',
                    inline=True)

    embed.add_field(name="Low",
                    value=f'{low}',
                    inline=True)

    embed.add_field(name="Close",
                    value=f'{close}',
                    inline=True)

    await ctx.send(embed=embed)


bot.run('TOKEN_GOES_HERE')
